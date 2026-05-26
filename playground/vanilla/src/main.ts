import { Accessify } from '@glitchlab/accessify'

const widget = new Accessify({
  position: 'bottom-right',
  size: 'M',
  persistence: true,
  onOpen: () => updateDebug(),
  onClose: () => updateDebug(),
  onReset: () => updateDebug(),
})

widget.mount()

function updateDebug() {
  const output = document.getElementById('state-output')
  if (output) {
    output.textContent = JSON.stringify(
      { isOpen: widget.getIsOpen(), state: widget.getState() },
      null,
      2
    )
  }
}

document.getElementById('btn-open')?.addEventListener('click', () => widget.open())
document.getElementById('btn-close')?.addEventListener('click', () => widget.close())
document.getElementById('btn-toggle')?.addEventListener('click', () => widget.toggle())
document.getElementById('btn-reset')?.addEventListener('click', () => widget.reset())

updateDebug()
