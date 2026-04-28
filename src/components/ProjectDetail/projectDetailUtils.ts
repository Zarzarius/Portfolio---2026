export function getProjectTypeLabel(
  type: 'professional' | 'personal',
  professionalLabel: string,
  personalLabel: string,
): string {
  return type === 'professional' ? professionalLabel : personalLabel;
}

export function formatProjectMeta(
  typeLabel: string,
  category: string | undefined,
): string {
  return category ? `${typeLabel} · ${category}` : typeLabel;
}
