import type { Instrumentation } from "next"

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context
) => {
  const message = err instanceof Error ? err.message : String(err)
  const digest =
    typeof err === 'object' && err !== null && 'digest' in err
      ? String(err.digest)
      : undefined

  await fetch(process.env[ 'ALFONDEV_DISCORD_SERVER_LOG_WEBHOOK' ]!, {
    method: 'POST',
    body: JSON.stringify({
      thread_id: '1538230599423098911',
      content: {
        request,
        context,
        digest,
        message,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

