export const getLabelColor = (labelName: string): string => {
  const labelColors: Record<string, string> = {
    bug: 'bg-red-100 text-red-800',
    enhancement: 'bg-cyan-100 text-cyan-800',
    default: 'bg-gray-200 text-gray-700'
  };

  return labelColors[labelName.toLowerCase()] || labelColors.default;
}; 