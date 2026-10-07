#!/bin/sh
# Cursor consumes stdout as a policy response. Never expose bt output there.
# Keep the original native JSON on stdin; the daemon owns all interpretation.
BT_BIN="${BT_BIN:-bt}"
if command -v "$BT_BIN" >/dev/null 2>&1; then
  # Leave time to emit the policy response before Cursor's 10-second timeout.
  if ! "$BT_BIN" trace hook --source cursor \
    --session-id-field conversation_id --event-field hook_event_name \
    --transcript-path-field transcript_path --flush-on-turn-end \
    --capture-timeout-ms 8000 \
    >/dev/null 2>/dev/null; then
    printf '%s\n' 'trace-cursor: event capture unavailable; continuing.' >&2
  fi
fi

# beforeSubmitPrompt is a continuation hook, not a permission decision.
case "${1-}" in
  beforeSubmitPrompt)
    printf '%s\n' '{"continue":true}' ;;
  *)
    printf '%s\n' '{}' ;;
esac
exit 0
