export const flex = (
  justifyContent = 'center',
  alignItems = 'center',
  flexDirection = 'row'
) => {
  return `
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-direction: ${flexDirection};`;
};
