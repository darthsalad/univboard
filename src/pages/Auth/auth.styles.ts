import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 26,
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    wrapper: {
      padding: "50px 10px",
    },
  
    title2: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 600,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
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