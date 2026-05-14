export default defineAppConfig({
  global: {
    picture: {
      dark: '/brendan-stanton.avif',
      light: '/brendan-stanton.avif',
      alt: 'Brendan Stanton'
    },
    meetingLink: 'https://cal.com/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-lucide-car',
      'to': 'https://insurance.nysgpt.com',
      'target': '_blank',
      'aria-label': 'InsuranceGPT'
    }, {
      'icon': 'i-lucide-sun',
      'to': 'https://solar.nysgpt.com',
      'target': '_blank',
      'aria-label': 'SolarGPT'
    }, {
      'icon': 'i-lucide-baby',
      'to': 'https://childcare.nysgpt.com',
      'target': '_blank',
      'aria-label': 'ChildcareGPT'
    }]
  }
})
