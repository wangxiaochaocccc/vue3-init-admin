import i18n from '@/i18n'

export const genarateTitle = title => {
  return i18n.global.t('msg.route.' + title)
}
