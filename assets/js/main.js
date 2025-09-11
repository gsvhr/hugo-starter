(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    
    // Обновляем все переключатели на странице
    document.querySelectorAll('.theme-controller').forEach(checkbox => {
      checkbox.checked = (theme === 'dark')
    })
  }

  // Инициализация темы
  setTheme(getPreferredTheme())

  // Обработчик изменения системной темы (только для начальной автоматической настройки)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!getStoredTheme()) { // Только если пользователь не выбирал тему вручную
      setTheme(getPreferredTheme())
    }
  })

  // Инициализация переключателей после загрузки DOM
  window.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем начальное состояние всех переключателей
    const currentTheme = getPreferredTheme()
    document.querySelectorAll('.theme-controller').forEach(checkbox => {
      checkbox.checked = (currentTheme === 'dark')
    })

    // Добавляем обработчики кликов для всех переключателей
    document.querySelectorAll('.theme-controller').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const theme = checkbox.checked ? 'dark' : 'light'
        setStoredTheme(theme)
        setTheme(theme)
      })
    })
  })
})()