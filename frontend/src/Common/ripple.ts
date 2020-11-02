import 'Common/ripple.css'

export const Ripple = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el = event.currentTarget
    el.classList.add('ripple')
    
    el.style.setProperty('--ripple-animation', '')
    const clientX = event.clientX
    const clientY = event.clientY
    
    const diameter = Math.max(el.clientWidth, el.clientHeight)
    const radius = diameter/2

    const rippleWidth = `${diameter}px`
    const rippleHeight = `${diameter}px`

    const rippleLeft = `${clientX - el.getBoundingClientRect().x - radius}px`
    const rippleTop = `${clientY - el.getBoundingClientRect().y - radius}px`

    el.style.setProperty('--ripple-width', rippleWidth)
    el.style.setProperty('--ripple-height', rippleHeight)
    el.style.setProperty('--ripple-top', rippleTop)
    el.style.setProperty('--ripple-left', rippleLeft)
    el.style.setProperty('--ripple-animation', 'ripple')
}