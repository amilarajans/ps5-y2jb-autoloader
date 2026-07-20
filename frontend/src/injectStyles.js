import fontsCss from './styles/fonts.css?inline'
import cyberpunkCss from './styles/cyberpunk.css?inline'

export function injectCyberpunkStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById('y2jb-cyberpunk-css')) return
  const el = document.createElement('style')
  el.id = 'y2jb-cyberpunk-css'
  el.textContent = fontsCss + '\n' + cyberpunkCss
  document.head.appendChild(el)
}
