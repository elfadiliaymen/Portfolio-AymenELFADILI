// ===== DARK MODE =====
const toggleBtn = document.getElementById('darkToggle')
const body = document.body
let isDark = true

toggleBtn.addEventListener('click', () => {
  isDark = !isDark
  if (isDark) {
    body.classList.remove('light')
    toggleBtn.textContent = '🌙 Dark'
  } else {
    body.classList.add('light')
    toggleBtn.textContent = '☀️ Light'
  }
})

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburgerBtn')
const mobileMenu = document.getElementById('mobileMenu')

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open')
  mobileMenu.classList.toggle('open')
})

// close menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open')
    mobileMenu.classList.remove('open')
  })
})

// ===== BACK TO TOP =====
const backBtn = document.getElementById('back-to-top')

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backBtn.classList.add('show')
  } else {
    backBtn.classList.remove('show')
  }
})

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// ===== FADE IN ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.15 })

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

// ===== SKILL BARS ANIMATION =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-width')
        bar.style.width = target + '%'
      })
      barObserver.disconnect()
    }
  })
}, { threshold: 0.3 })

const barsSection = document.querySelector('.skill-bars')
if (barsSection) barObserver.observe(barsSection)

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn')
const projectCards = document.querySelectorAll('.project-card')

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    const filter = btn.getAttribute('data-filter')

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category')
      if (filter === 'all' || category === filter) {
        card.removeAttribute('data-hidden')
      } else {
        card.setAttribute('data-hidden', 'true')
      }
    })
  })
})

// ===== FORM VALIDATION =====
const form = document.getElementById('contactForm')

function showError(fieldId, errorId) {
  document.getElementById(fieldId).classList.add('error')
  document.getElementById(errorId).classList.add('show')
}

function clearError(fieldId, errorId) {
  document.getElementById(fieldId).classList.remove('error')
  document.getElementById(errorId).classList.remove('show')
}

// clear errors on input
document.getElementById('name').addEventListener('input', () => clearError('name', 'nameError'))
document.getElementById('email').addEventListener('input', () => clearError('email', 'emailError'))
document.getElementById('message').addEventListener('input', () => clearError('message', 'messageError'))

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value.trim()
  const email = document.getElementById('email').value.trim()
  const message = document.getElementById('message').value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  let valid = true

  if (!name) { showError('name', 'nameError'); valid = false }
  if (!emailRegex.test(email)) { showError('email', 'emailError'); valid = false }
  if (message.length < 10) { showError('message', 'messageError'); valid = false }

  if (valid) {
    document.getElementById('successMsg').classList.add('show')
    form.reset()
    setTimeout(() => {
      document.getElementById('successMsg').classList.remove('show')
    }, 4000)
  }
})