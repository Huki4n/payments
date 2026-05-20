export function getDefaultGoalDeadline(): string {
  const date = new Date()

  date.setFullYear(date.getFullYear() + 1)

  return date.toISOString().slice(0, 10)
}

export function getMinGoalDeadline(): string {
  const date = new Date()

  date.setDate(date.getDate() + 1)

  return date.toISOString().slice(0, 10)
}
