---
title: "[Cursor] Cusor로 PR 리뷰하기"
excerpt: "Cursor를 사용해서 자동으로 PR 리뷰하기"

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - Cursor
  - PR review
last_modified_at: 2025-08-20T21:42:00
---

저는 팀내 유일한 개발자로 플랫폼 개발부터 운영까지 혼자서 담당하고 있습니다. 그렇다 보니 늘 코드 리뷰에 대한 갈망이 있었습니다. 처음 설계하는 순간부터 프로덕션에 배포하는 순간까지 코드를 보는 사람이 저 뿐이라, 제가 아무리 다양한 변수를 고려하고, 꼼꼼히 작성하려고 노력해도 놓치는 부분이 생길 수 밖에 없기 때문입니다.

그렇기 때문에 제가 아닌 다른 시선의 코드 리뷰가 필요하다고 생각했고 그 중에서도 특히 LLM을 활용한 코드 리뷰에 관심을 가졌습니다. 하지만 기존 서비스는 비용을 지불해야하거나 코드가 외부에 노출될 수 있는 위험이 있었기 때문에 이용하기 어려웠습니다.

그러던 중 [Leveraging AI for Smarter GitHub PR Reviews with Cursor](https://www.surajadsul.me/blog/leveraging_ai_for_smarter_github_pr_reviews_with_cursor)라는 글을 읽게 되었고, 해당 포스트를 참고하여 Cursor로 PR을 리뷰하는 시스템을 직접 구축했습니다. 아래 코드는 위 블로그의 예제를 토대로 제가 수정, 보완한 버전임을 미리 밝힙니다.

# Prerequisites

- Cursor IDE
- GitHub CLI
- Python
- GitHub Token (classic, repo)
- `curl`, `jq`, `git` 패키지

# Steps

## 1. Cursor 규칙 설정

[Cursor Rules](https://docs.cursor.com/en/context/rules)는 일종의 컨텍스트 매니저로 코드에 대한 도메인 지식이나 워크 플로우, 스타일·아키텍처 표준화를 파일 단위로 관리하는 시스템입니다. 해당 규칙은 자동으로 활성화 하거나 수동으로 호출 할 수 있습니다. Cursor 규칙은 `.cursor/rules`에서 바로 설정할 수도 있고 `Cursor Settings > Rules`에서 `Add Rule`을 눌러 설정할 수도 있습니다.

<p><img src="/assets/images/250820/01.png" /></p>

<p><img src="/assets/images/250820/02.png" /></p>

`Add Rule` 버튼을 누르면 루트 디렉토리에 `.cursor` 디렉토리가 자동으로 생성됩니다.

<p><img src="/assets/images/250820/03.png" /></p>

규칙의 이름을 설정하여 새 규칙을 생성합니다. Cursor 채팅창에서 이 이름으로 규칙을 호출 할 수 있습니다. 저는 참고 예제에서 사용하고 있는 `github-pr-review`로 생성했습니다.

<p><img src="/assets/images/250820/04.png" /></p>

규칙을 생성하고 나면 `.cursor` 디렉토리 아래 새로 생성한 규칙의 이름과 같은 이름의 `.mdc` 파일이 생성된 것을 확인할 수 있습니다. 해당 파일에서 생성한 규칙을 수동으로 적용할 지 등의 옵션을 설정할 수 있습니다.

<p><img src="/assets/images/250820/05.png" /></p>

생성된 파일에 아래와 같이 규칙을 명시합니다.

{% highlight shell linenos %}

# Github PR review

You are an experienced senior software engineer tasked with reviewing a Git Pull Request (PR). Your goal is to provide comments to improve code quality, catch typos, potential bugs or security issues, and provide meaningful code suggestions when applicable. You should not make comments about adding comments, about code formatting, about code style or give implementation suggestions.

The review should focus on new code added in the PR code diff (lines starting with '+') and be actionable.

# The PR diff will have the following structure:

## File: 'src/file1.py'

@@ ... @@ def func1():
**new hunk**
11 unchanged code line0 in the PR
12 unchanged code line1 in the PR
13 +new code line2 added in the PR
14 unchanged code line3 in the PR
**old hunk**
unchanged code line0
unchanged code line1
-old code line2 removed in the PR
unchanged code line3
**existing_comment_thread**
presubmitai: This is a comment on the code
user2: This is a reply to the comment above
**existing_comment_thread**
presubmitai: This is a comment on some other parts of the code
user2: This is a reply to the above comment

@@ ... @@ def func2():
**new hunk**
unchanged code line4
+new code line5 removed in the PR
unchanged code line6

## File: 'src/file2.py'

# ...

- In the format above, the diff is organized into separate '**new hunk**' and '**old hunk**' sections for each code chunk. '**new hunk**' contains the updated code, while '**old hunk**' shows the removed code. If no code was removed in a specific chunk, the **old hunk** section will be omitted.
- We also added line numbers for the '**new hunk**' code, to help you refer to the code lines in your suggestions. These line numbers are not part of the actual code, and should only used for reference.
- Code lines are prefixed with symbols ('+', '-', ' '). The '+' symbol indicates new code added in the PR, the '-' symbol indicates code removed in the PR, and the ' ' symbol indicates unchanged code. The review should address new code added in the PR code diff (lines starting with '+')
- Use markdown formatting for your comments.
- Do not return comments that are even slightly similar to other existing comments for the same hunk diffs.
- If you cannot find any actionable comments, return an empty array.
- VERY IMPORTANT: Keep in mind you're only seeing part of the code, and the code might be incomplete. Do not make assumptions about the code outside the diff.
- Do not give positive comments or compliments.
- Use fetch_pr_diff tool first to review the code and then generate the JSON response in following JSON format: {"reviews": [{"filePath": <file_path>, "lineNumber": <line_number>, "reviewComment": "<review comment>"}]}

## Tools

You can utilize these tools.

- GitHub CLI

```bash
# cd <PROJECT_DIRECTORY> && gh pr diff <PR_NUMBER> | grep "^+" | cat
# cd <PROJECT_DIRECTORY> && gh pr diff <PR_NUMBER> | cat
cd ${PROJECT_ROOT} && python3 cursor-tools/fetch_pr_diff.py
```

Use the json from given Prompt to comment on PR. Use command like this for each review comment like this.

```bash
cd ${PROJECT_ROOT} && cursor-tools/gh-pr-comment.sh pr review <PR_NUMBER> --comment -b <review comment> --path <FILE_PATH> --line <LINE_NUMBER>
```

**Note**: Make sure to set `PROJECT_ROOT` environment variable in your `.env` file before using these tools.
{% endhighlight %}

## 2. 실행에 필요한 파일 준비

우선 실행에 필요한 파일을 준비합니다. 필요한 파일은 다음과 같습니다.

- `fetch_pr_diff.py`: GitHub PR의 변경점(diff)을 가져오는 Python 스크립트
- `gh-pr-comment.sh`: GitHub PR에 리뷰 코멘트를 추가하는 bash 스크립트
- `.env`: GitHub 토큰과 프로젝트 루트 디렉토리 경로를 저장하는 환경변수 파일
- `.gitignore`(optional): Git에서 추적하지 않을 파일들을 지정하는 설정 파일

### 2.1 프로젝트 루트 디렉토리 생성

프로젝트의 루트 디렉토리에 `cursor-tools` 디렉토리를 생성합니다. 디렉토리 명은 자유롭게 설정할 수 있으며 다른 이름을 사용하신 경우 위의 규칙 파일도 함께 수정해주세요. 이후 언급하는 모든 파일은 이 디렉토리 아래 생성합니다.

{% highlight shell linenos %}
mkdir cursor-tools
{% endhighlight %}

### 2.2 fetch_pr_diff.py
PR의 변경사항을 가져오는 `fetch_pr_diff.py` 파일을 생성합니다. 파일 생성 후 아래와 같이 작성해주세요.

{% highlight python linenos %}

import re
import subprocess
import argparse
from urllib.parse import urlparse

def get_repo():
    """Fetches the GitHub repository details from the current branch."""
    result = subprocess.run("git config --get remote.origin.url", shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error fetching repository details (exit code: {result.returncode}):")
        print(f"Command: git config --get remote.origin.url")
        print(f"Error: {result.stderr}")
        print("Please ensure you are in a git repository with a remote origin configured.")
        exit(1)
    repo_url = result.stdout.strip()
    
    # Parse URL safely using urllib.parse
    parsed_url = urlparse(repo_url)
    
    # Handle both SSH and HTTPS URLs
    if parsed_url.scheme == 'ssh' or ':' in parsed_url.path:
        # SSH format: git@github.com:owner/repo.git
        path = parsed_url.path.lstrip('/')
        if ':' in path:
            owner, repo = path.split(':', 1)
        else:
            owner, repo = path.split('/', 1)
    else:
        # HTTPS format: https://github.com/owner/repo.git
        path_parts = parsed_url.path.strip('/').split('/')
        if len(path_parts) >= 2:
            owner, repo = path_parts[0], path_parts[1]
        else:
            print("Error: Invalid repository URL format")
            exit(1)
    
    # Remove .git extension if present
    repo = repo.replace('.git', '')
    
    return f"{owner}/{repo}"

def get_pr_number():
    """Fetches the current PR number if available."""
    result = subprocess.run("gh pr view --json number --jq .number", shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error fetching PR number (exit code: {result.returncode}):")
        print(f"Command: gh pr view --json number --jq .number")
        print(f"Error: {result.stderr}")
        print("Please ensure:")
        print("1. You are on a PR branch")
        print("2. GitHub CLI (gh) is installed and authenticated")
        print("3. You have access to the repository")
        exit(1)
    return result.stdout.strip()

def get_pr_diff(pr_number, repo):
    """Fetches the PR diff using GitHub CLI."""
    cmd = f"gh pr diff {pr_number} --repo {repo}"
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error fetching PR diff (exit code: {result.returncode}):")
        print(f"Command: {cmd}")
        print(f"Error: {result.stderr}")
        print("Please ensure:")
        print(f"1. PR #{pr_number} exists in repository {repo}")
        print("2. You have access to view the PR")
        print("3. GitHub CLI (gh) is authenticated")
        exit(1)
    return result.stdout

def parse_diff(diff_text):
    result = []
    current_file = None
    current_hunk = None

    for line in diff_text.splitlines():
        file_match = re.match(r'^diff --git a/(.+) b/(.+)', line)
        if file_match:
            if current_file:
                result.append("\n".join(current_file))
            current_file = [f"## File: '{file_match.group(2)}'"]
            current_hunk = None  # Reset current hunk when a new file starts
            continue

        hunk_match = re.match(r'^@@.*@@', line)
        if hunk_match:
            if current_hunk:
                result.append("\n".join(current_hunk))
            current_hunk = ["\n@@ ... @@", "__new hunk__"]
            continue

        if current_hunk is None:
            current_hunk = []  # Ensure hunk is initialized

        if line.startswith('+') and not line.startswith('+++'):
            current_hunk.append(f"{line[1:]} +new code line added in the PR")
        elif line.startswith('-') and not line.startswith('---'):
            current_hunk.append(f"{line[1:]} -old code line removed in the PR")
        else:
            current_hunk.append(line)

    if current_hunk:
        result.append("\n".join(current_hunk))

    if current_file:
        result.append("\n".join(current_file))

    return "\n".join(result)

if __name__ == "__main__":
    repo = get_repo()
    pr_number = get_pr_number()
    
    diff_content = get_pr_diff(pr_number, repo)
    parsed_diff = parse_diff(diff_content)
    print(parsed_diff)

{% endhighlight %}

### 2.3 gh-pr-comment.sh
PR에 리뷰 코멘트를 작성하는 bash script 파일 `gh-pr-comment.sh`를 생성합니다. 파일을 생성한 후 아래와 같이 작성해주세요.

{% highlight shell linenos %}
#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f "$(dirname "$0")/.env" ]; then
    # Use set -a to automatically export variables, then source the file
    set -a
    source "$(dirname "$0")/.env"
    set +a
fi
# Ensure required environment variables are set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN environment variable is not set."
    echo "Please set it in your .env file:"
    echo "GITHUB_TOKEN=your_github_token_here"
    exit 1
fi

if [ -z "$PROJECT_ROOT" ]; then
    echo "Error: PROJECT_ROOT environment variable is not set."
    echo "Please set it in your .env file:"
    echo "PROJECT_ROOT=/path/to/your/project"
    exit 1
fi

# Check arguments
if [ "$1" != "pr" ] || [ "$2" != "review" ]; then
    echo "Usage: $0 pr review <PR_NUMBER> --comment -b <review comment> --path <FILE_PATH> --line <LINE_NUMBER>"
    exit 1
fi

# Parse arguments
PR_NUMBER=$3
shift 3

COMMENT=""
FILE_PATH=""
LINE_NUMBER=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --comment)
            shift
            if [ "$1" != "-b" ]; then
                echo "Error: --comment flag must be followed by -b <review comment>"
                exit 1
            fi
            shift
            COMMENT="$1"
            ;;
        --path)
            shift
            FILE_PATH="$1"
            ;;
        --line)
            shift
            LINE_NUMBER="$1"
            ;;
        *)
            echo "Unknown argument: $1"
            exit 1
            ;;
    esac
    shift
done

# Validate required parameters
if [ -z "$PR_NUMBER" ] || [ -z "$COMMENT" ] || [ -z "$FILE_PATH" ] || [ -z "$LINE_NUMBER" ]; then
    echo "Error: Missing required parameters."
    echo "Usage: $0 pr review <PR_NUMBER> --comment -b <review comment> --path <FILE_PATH> --line <LINE_NUMBER>"
    exit 1
fi

# Get repository owner and name from git remote
REMOTE_URL=$(git config --get remote.origin.url)
if [[ "$REMOTE_URL" =~ github.com[:/]([^/]+)/([^/.]+) ]]; then
    OWNER="${BASH_REMATCH[1]}"
    REPO="${BASH_REMATCH[2]}"
else
    echo "Error: Could not determine repository owner and name from remote URL: $REMOTE_URL"
    exit 1
fi

echo "Repository: $OWNER/$REPO"
echo "PR Number: $PR_NUMBER"
echo "File Path: $FILE_PATH"
echo "Line Number: $LINE_NUMBER"
echo "Comment: $COMMENT"
echo "Fetching commit ID..."

# Get latest commit ID of the PR
API_COMMIT_URL="https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER"
LATEST_COMMIT_ID=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" "$API_COMMIT_URL" | jq -r '.head.sha')

if [ -z "$LATEST_COMMIT_ID" ] || [ "$LATEST_COMMIT_ID" == "null" ]; then
    echo "Error: Could not fetch the latest commit ID for PR #$PR_NUMBER"
    exit 1
fi

echo "Latest Commit ID: $LATEST_COMMIT_ID"
# Add review comment using GitHub API
API_URL="https://api.github.com/repos/$OWNER/$REPO/pulls/$PR_NUMBER/comments"

# Create JSON payload safely using jq
JSON_PAYLOAD=$(jq -n \
    --arg body "$COMMENT" \
    --arg commit_id "$LATEST_COMMIT_ID" \
    --arg path "$FILE_PATH" \
    --arg line "$LINE_NUMBER" \
    '{
        body: $body,
        commit_id: $commit_id,
        path: $path,
        line: ($line | tonumber),
        side: "RIGHT"
    }')

RESPONSE=$(curl -L -s -o "$(dirname "$0")/response.json" -w "%{http_code}" \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    -H "Content-Type: application/json" \
    "$API_URL" \
    -d "$JSON_PAYLOAD")


# echo "Response Code: $RESPONSE"
if [[ "$RESPONSE" -ne 201 ]]; then
    echo "Failed to add review comment. Check response.json for more details."
    exit 1
fi

echo "Review comment added successfully."
{% endhighlight %}

### 2.4 .env
규칙을 수행하는 데 필요한 환경 변수를 지정합니다. GitHub 토큰은 repo 권한이 있는 classic token으로 생성했습니다.

{% highlight shell linenos %}
GITHUB_TOKEN=YOUR_GITHUB_TOKEN
PROJECT_ROOT=YOUR_PROJECT_ROOT_DIRECTORY
{% endhighlight %}

### 2.5 .gitignore (optional)
필요한 경우 `.gitignore` 파일을 생성합니다. PR 리뷰를 하는 동안 GitHub API 응답 결과를 저장하는 `response.json` 파일이 자동으로 생성됩니다. 저는 이 `response.json` 파일과 `.env` 파일을 `.gitignore`로 설정해주었습니다.

{% highlight shell linenos %}
response.json
.env
{% endhighlight %}

## 3. 코드 리뷰하기
필요한 단계는 모두 끝났습니다. 이제 Cursor 채팅창에서 리뷰를 하고자 하는 PR의 번호와 함께 리뷰를 요청하면됩니다. 명령은 아래와 같이 입력하면 됩니다. 요청은 기존에 Cursor와 소통하는 것 처럼 자연어로 요청합니다. PR 번호만 명시한다면 언어와 형식은 무관합니다.

{% highlight shell linenos %}
@github-pr-review Do the PR review for PR 382
{% endhighlight %}

<p><img src="/assets/images/250820/06.png" /></p>
<p><img src="/assets/images/250820/12.png" /></p>

잠시 기다리면 아래와 같이 리뷰가 완료되었다는 메세지가 나타납니다.

<p><img src="/assets/images/250820/07.png" /></p>

PR에 가보면 아래와 같이 리뷰 코멘트가 정상적으로 나타난 것을 확인할 수 있습니다.

<p><img src="/assets/images/250820/08.png" /></p>

PR 전반에 대한 리뷰 뿐만 아니라 특정 구간에 대한 리뷰 코멘트도 정상적으로 달리는 것을 확인할 수 있습니다.

<p><img src="/assets/images/250820/09.png" /></p>

리뷰를 수행한 채팅에서 해당 코멘트를 그대로 복사해서 붙여 넣으면 아래와 같이 별다른 설명 없이 바로 수정도 가능합니다.

<p><img src="/assets/images/250820/10.png" /></p>
<p><img src="/assets/images/250820/11.png" /></p>
