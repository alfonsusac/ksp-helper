import type { ComponentRenderFn, DialogTriggerState, HTMLProps } from '@base-ui/react'
import { Dialog } from '@base-ui/react/dialog'
import type { JSXElementConstructor, ReactElement, ReactNode } from 'react'

export default function BasicDialog(props: {
  button: ReactElement<unknown, string | JSXElementConstructor<any>> | ComponentRenderFn<HTMLProps, DialogTriggerState> | undefined
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={props.button} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup>
            <Dialog.Title />
            <Dialog.Description />
            <Dialog.Close />
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}