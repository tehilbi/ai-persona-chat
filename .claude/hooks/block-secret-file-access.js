#!/usr/bin/env node
// PreToolUse guardrail: blocks any tool access to .env files.
// Catches Read, Edit, Write, Bash, Grep, Glob — any tool that touches the file.

const SECRET_FILE_PATTERN = /(^|[\/\\])\.env(\.local|\.development|\.production)?(?![\w.-])/i
const SECRET_IN_COMMAND_PATTERN = /(^|[\s"'=/\\])[\w./\\-]*\.env(\.local|\.development|\.production)?(?![\w.-])/i

const PATH_FIELDS = ['file_path', 'path', 'notebook_path']

let input = ''
process.stdin.on('data', chunk => { input += chunk })
process.stdin.on('end', () => {
  let payload
  try {
    payload = JSON.parse(input)
  } catch {
    process.exit(0)
  }

  const toolInput = payload?.tool_input ?? {}

  const blockedPath = PATH_FIELDS
    .map(field => toolInput[field])
    .find(value => typeof value === 'string' && SECRET_FILE_PATTERN.test(value))

  const command = typeof toolInput.command === 'string' ? toolInput.command : ''
  const blockedCommand = SECRET_IN_COMMAND_PATTERN.test(command)

  if (blockedPath || blockedCommand) {
    console.error(
      `[guardrail] Blocked ${payload?.tool_name ?? 'tool'} call touching an env/secret file` +
      `${blockedPath ? `: ${blockedPath}` : ''}. Use .env.example instead.`
    )
    process.exit(2)
  }

  process.exit(0)
})
