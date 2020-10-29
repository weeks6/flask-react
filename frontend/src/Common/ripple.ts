    
import "Common/ripple.css"

export const Ripple = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {

    const elementToRipple = event.currentTarget
    const rippleCircle = document.createElement('span')
    const diameter = Math.max(elementToRipple.clientWidth, elementToRipple.clientHeight)
    const radius = diameter/2

    rippleCircle.style.width = rippleCircle.style.height = `${diameter}px`

    console.log(elementToRipple.getBoundingClientRect());
    console.log(event.clientX)
    console.log(event.clientY);
    
     
    
    rippleCircle.style.left = `${event.clientX - elementToRipple.getBoundingClientRect().x - radius}px`
    rippleCircle.style.top = `${event.clientY - elementToRipple.getBoundingClientRect().y - radius}px`
    // console.log(event.clientX)
    // console.log(event.clientY)

    rippleCircle.classList.add("ripple-animate");
    
    const rippleEls = document.getElementsByClassName("ripple-animate")[0]

    if (rippleEls) {
        rippleEls.remove()
    }

    elementToRipple.appendChild(rippleCircle)
}