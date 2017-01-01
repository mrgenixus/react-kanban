# Notes:

## Props:

- labels
  - either an array of values OR
  - an array of objects with atleast keys 'title' and 'value'

- label component
  - must be a valid react component
  - will recieve labels as objects spread as props title, value, ...etc

- keyField
  - must be a valid object key and will be the source for which column a card goes into. cards with unknown values will not be shown
  - defaults to 'kanban'

- showDynamicLables
  - will display/augment labels based on values for key-field

- cards
  - an array of objects with title, description

- card component
  - will be wrapped in a library card component for display
  - will accept each card spread as props or as modified by preprocessCardProps
  - default card component will display title, description and list the remainder of the props as a DL

- preprocessCardProps
  - function must return transform of card attributes to valid component props

- onColumnChange
  - will return label object: ({ title, value, ....}), card as passed based on card moved.
