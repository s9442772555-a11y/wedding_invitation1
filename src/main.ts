import './styles.css'

const entryStage = document.querySelector<HTMLElement>('#entry')
const invitation = document.querySelector<HTMLElement>('#invitation')
const envelope = document.querySelector<HTMLElement>('.envelope')
const sealButton = document.querySelector<HTMLButtonElement>('#sealButton')
const soundButton = document.querySelector<HTMLButtonElement>('#soundButton')
const scratchCanvas = document.querySelector<HTMLCanvasElement>('#scratchCanvas')
const scratchCard = document.querySelector<HTMLElement>('#scratchCard')
const scratchInstruction = document.querySelector<HTMLElement>('#scratchInstruction')
const galleryTrack = document.querySelector<HTMLElement>('#galleryTrack')
const galleryViewport = document.querySelector<HTMLElement>('.gallery-viewport')
const galleryDots = document.querySelector<HTMLElement>('#galleryDots')
const galleryPrev = document.querySelector<HTMLButtonElement>('#galleryPrev')
const galleryNext = document.querySelector<HTMLButtonElement>('#galleryNext')
const rsvpForm = document.querySelector<HTMLFormElement>('#rsvpForm')
const rsvpMessage = document.querySelector<HTMLElement>('#rsvpMessage')
const progressBar = document.querySelector<HTMLElement>('.scroll-progress span')

let hasOpened = false
let soundOn = false

const enableInvitation = (): void => {
  if (hasOpened || !entryStage || !invitation) return
  hasOpened = true
  envelope?.classList.add('is-open')
  entryStage.classList.add('is-opening')
  document.body.style.overflow = 'hidden'
  window.setTimeout(() => {
    entryStage.classList.add('is-open')
    invitation.classList.add('is-live')
    invitation.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = ''
    window.scrollTo(0, 0)
    document.querySelector<HTMLElement>('.hero-content')?.classList.add('is-visible')
  }, 1500)
}

sealButton?.addEventListener('click', enableInvitation)
entryStage?.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  if (target.closest('[data-scroll-target]')) enableInvitation()
})

document.querySelectorAll<HTMLButtonElement>('[data-scroll-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.scrollTarget
    if (!target) return
    if (!hasOpened) enableInvitation()
    window.setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }), hasOpened ? 0 : 1600)
  })
})

soundButton?.addEventListener('click', () => {
  soundOn = !soundOn
  soundButton.setAttribute('aria-pressed', String(soundOn))
  soundButton.classList.toggle('is-active', soundOn)
})

const observeReveals = (): void => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: .18 })
  document.querySelectorAll<HTMLElement>('.reveal-on-scroll').forEach((element) => observer.observe(element))
}
observeReveals()

const setupScratchCard = (): void => {
  if (!scratchCanvas || !scratchCard) return
  const context = scratchCanvas.getContext('2d')
  if (!context) return
  const size = 520
  const resizeCanvas = (): void => {
    const ratio = window.devicePixelRatio || 1
    scratchCanvas.width = size * ratio
    scratchCanvas.height = size * ratio
    scratchCanvas.style.width = '100%'
    scratchCanvas.style.height = '100%'
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    const gradient = context.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, '#efb1bd')
    gradient.addColorStop(.45, '#b8547f')
    gradient.addColorStop(1, '#76254f')
    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)
    context.globalAlpha = .34
    for (let i = 0; i < 260; i += 1) {
      context.fillStyle = i % 3 === 0 ? '#fff1cf' : '#ffd6e6'
      context.beginPath()
      context.arc(Math.random() * size, Math.random() * size, Math.random() * 3 + 1, 0, Math.PI * 2)
      context.fill()
    }
    context.globalAlpha = 1
    context.fillStyle = 'rgba(255,242,213,.9)'
    context.font = 'italic 27px Cormorant Garamond, Georgia, serif'
    context.textAlign = 'center'
    context.fillText('scratch to reveal', size / 2, size / 2 + 5)
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  let scratching = false
  let revealed = false
  const scratch = (event: PointerEvent): void => {
    if (!scratching || revealed) return
    const rect = scratchCanvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * size
    const y = ((event.clientY - rect.top) / rect.height) * size
    context.globalCompositeOperation = 'destination-out'
    context.beginPath()
    context.arc(x, y, 34, 0, Math.PI * 2)
    context.fill()
    const pixels = context.getImageData(0, 0, size, size).data
    let cleared = 0
    for (let i = 3; i < pixels.length; i += 16) if (pixels[i] < 30) cleared += 1
    if (cleared / (pixels.length / 16) > .33) {
      revealed = true
      context.clearRect(0, 0, size, size)
      scratchCard.classList.add('is-revealed')
      if (scratchInstruction) {
        scratchInstruction.textContent = 'Date unlocked · see you on 22 October'
        scratchInstruction.classList.add('is-revealed')
      }
    }
  }
  scratchCanvas.addEventListener('pointerdown', (event) => {
    scratching = true
    scratchCanvas.setPointerCapture(event.pointerId)
    scratch(event)
  })
  scratchCanvas.addEventListener('pointermove', scratch)
  scratchCanvas.addEventListener('pointerup', () => { scratching = false })
  scratchCanvas.addEventListener('pointercancel', () => { scratching = false })
}
setupScratchCard()

const slides = Array.from(document.querySelectorAll<HTMLElement>('.gallery-card'))
let slideIndex = 0
let galleryTimer: number | undefined
const updateGallery = (): void => {
  if (!galleryTrack || slides.length === 0) return
  slides.forEach((slide, index) => slide.classList.toggle('is-active', index === slideIndex))
  galleryDots?.querySelectorAll('button').forEach((dot, index) => {
    dot.classList.toggle('is-active', index === slideIndex)
    dot.setAttribute('aria-current', index === slideIndex ? 'true' : 'false')
  })
}
slides.forEach((_, index) => {
  const dot = document.createElement('button')
  dot.type = 'button'
  dot.ariaLabel = `Show photo ${index + 1}`
  dot.addEventListener('click', () => { slideIndex = index; updateGallery(); restartGalleryTimer() })
  galleryDots?.append(dot)
})
const moveGallery = (delta: number): void => {
  slideIndex = (slideIndex + delta + slides.length) % slides.length
  updateGallery()
  restartGalleryTimer()
}

const restartGalleryTimer = (): void => {
  if (galleryTimer !== undefined) window.clearInterval(galleryTimer)
  galleryTimer = window.setInterval(() => moveGallery(1), 2000)
}

galleryPrev?.addEventListener('click', () => moveGallery(-1))
galleryNext?.addEventListener('click', () => moveGallery(1))
window.addEventListener('resize', updateGallery)
let swipeStartX = 0
let swipeStartY = 0
galleryViewport?.addEventListener('pointerdown', (event) => {
  swipeStartX = event.clientX
  swipeStartY = event.clientY
  galleryViewport.setPointerCapture(event.pointerId)
})
galleryViewport?.addEventListener('pointerup', (event) => {
  const deltaX = event.clientX - swipeStartX
  const deltaY = event.clientY - swipeStartY
  if (Math.abs(deltaX) > 44 && Math.abs(deltaX) > Math.abs(deltaY)) moveGallery(deltaX < 0 ? 1 : -1)
})
galleryViewport?.addEventListener('pointercancel', () => {
  swipeStartX = 0
  swipeStartY = 0
})
updateGallery()
restartGalleryTimer()

const weddingMoment = new Date('2026-10-22T08:00:00+05:30').getTime()
const updateCountdown = (): void => {
  const remaining = Math.max(0, weddingMoment - Date.now())
  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining / 3600000) % 24)
  const minutes = Math.floor((remaining / 60000) % 60)
  const seconds = Math.floor((remaining / 1000) % 60)
  const values: Record<string, string> = { days: String(days).padStart(2, '0'), hours: String(hours).padStart(2, '0'), minutes: String(minutes).padStart(2, '0'), seconds: String(seconds).padStart(2, '0') }
  Object.entries(values).forEach(([key, value]) => {
    const element = document.querySelector<HTMLElement>(`#${key}`)
    if (element) element.textContent = value
  })
}
updateCountdown()
window.setInterval(updateCountdown, 1000)

rsvpForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  if (rsvpMessage) rsvpMessage.textContent = 'Thank you — your reply has been tucked away with love.'
  rsvpForm.reset()
})

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0
  if (progressBar) progressBar.style.width = `${progress}%`
}, { passive: true })
