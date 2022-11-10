import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 26,
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    wrapper: {
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },
  
    title2: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 900,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
  
      [theme.fn.smallerThan('sm')]: {
        fontSize: 28,
        textAlign: 'left',
      },
    },
  
    description: {
      textAlign: 'center',
  
      [theme.fn.smallerThan('sm')]: {
        textAlign: 'left',
      },
    },
  
    controls: {
      [theme.fn.smallerThan("xs")]: {
        flexDirection: "column-reverse",
      },
    },
  
    control: {
      [theme.fn.smallerThan("xs")]: {
        width: "100%",
        textAlign: "center",
      },
    },
    
    invalid: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
    },
  }));