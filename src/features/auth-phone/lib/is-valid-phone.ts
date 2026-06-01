import { normalizePhone } from '@/entities/session'

import { PHONE_PATTERN } from '../config/constants'

export const isValidPhone = (raw: string) => PHONE_PATTERN.test(normalizePhone(raw))
