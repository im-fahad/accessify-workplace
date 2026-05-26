import { useEffect, useRef, useState, useCallback } from 'react'
import { Accessify, type AccessifyConfig, type AccessifyState } from '../core'

export type AccessifyWidgetProps = AccessifyConfig

export function AccessifyWidget(props: AccessifyWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<Accessify | null>(null)

  useEffect(() => {
    const instance = new Accessify(props)
    instanceRef.current = instance

    if (containerRef.current) {
      instance.mount(containerRef.current)
    }

    return () => {
      instance.destroy()
      instanceRef.current = null
    }
  }, [])

  return <div ref={containerRef} />
}

export function useAccessify(config: AccessifyConfig = {}) {
  const instanceRef = useRef<Accessify | null>(null)
  const [state, setState] = useState<AccessifyState | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const instance = new Accessify(config)
    instanceRef.current = instance
    instance.mount()
    setState(instance.getState())
    return () => {
      instance.destroy()
      instanceRef.current = null
    }
  }, [])

  const open = useCallback(() => {
    instanceRef.current?.open()
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    instanceRef.current?.close()
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    instanceRef.current?.toggle()
    setIsOpen(prev => !prev)
  }, [])

  const reset = useCallback(() => {
    instanceRef.current?.reset()
    if (instanceRef.current) {
      setState(instanceRef.current.getState())
    }
  }, [])

  return { open, close, toggle, reset, state, isOpen }
}

export type { AccessifyConfig, AccessifyState } from '../core'
export { Accessify } from '../core'
