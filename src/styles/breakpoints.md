# Responsive Breakpoints Documentation

Este documento define los breakpoints responsive utilizados en la aplicación para mantener consistencia en todos los componentes.

## Tailwind CSS Breakpoints

```css
/* Mobile First Approach */
/* Default: 0px - 639px (Mobile) */
sm: 640px   /* Small devices (tablets) */
md: 768px   /* Medium devices (small laptops) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

## Component Usage Patterns

### StatsCards

- **Mobile (default)**: 1 column
- **sm (640px+)**: 2 columns
- **md (768px+)**: 3 columns
- **lg (1024px+)**: 3 columns (optimized for readability)
- **xl (1280px+)**: 6 columns (full desktop layout)

### JobsList

- **Mobile (default)**: 1 column
- **sm (640px+)**: 1 column (single column on tablets)
- **md (768px+)**: 2 columns
- **lg (1024px+)**: 3 columns
- **xl (1280px+)**: 4 columns

### Dashboard Layout

- **Mobile**: Stacked layout (flex-col)
- **sm+**: Horizontal layout for controls (flex-row)

### Card Component

- **Mobile**: `p-4` (16px padding)
- **sm+**: `p-6` (24px padding)
- **lg+**: `p-8` (32px padding)

## Typography Scaling

### Text Sizes

- **Icons**: `text-xl sm:text-2xl`
- **Titles**: `text-xs sm:text-sm`
- **Values**: `text-2xl sm:text-3xl lg:text-2xl xl:text-3xl`
- **Labels**: `text-xs sm:text-sm`

## Spacing Guidelines

### Gaps

- **Mobile**: `gap-4` (16px)
- **sm+**: `gap-6` (24px)

### Padding

- **Container**: `p-4 sm:p-6`
- **Cards**: `p-4 sm:p-6 lg:p-8`

## Best Practices

1. **Mobile First**: Always design for mobile first, then enhance for larger screens
2. **Consistent Breakpoints**: Use the same breakpoints across all components
3. **Content Priority**: Ensure important content is visible on all screen sizes
4. **Touch Targets**: Maintain minimum 44px touch targets on mobile
5. **Text Readability**: Ensure text is readable on all screen sizes

## Testing Checklist

- [ ] Mobile (320px - 639px)
- [ ] Tablet (640px - 767px)
- [ ] Small Desktop (768px - 1023px)
- [ ] Desktop (1024px - 1279px)
- [ ] Large Desktop (1280px+)
