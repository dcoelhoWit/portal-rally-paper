/** "1 equipa inscrita" / "N equipas inscritas". */
export function formatParticipantCount(count: number): string {
  return count === 1 ? '1 equipa inscrita' : `${count} equipas inscritas`
}
