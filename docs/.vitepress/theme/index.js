import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './styles/custom.css'

export default {
  ...DefaultTheme,
  Layout: Layout
}