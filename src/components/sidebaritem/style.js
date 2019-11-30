const styles = theme => ({
    listItem: {
      cursor: 'pointer',
      margin: '3px 3px 3px 3px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
      "&:hover": {
          boxShadow: '0 9px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
      }
    },
    textSection: {
      maxWidth: '85%'
    },  
    deleteIcon: {
      position: 'absolute',
      right: '5px',
      top: 'calc(50% - 15px)',
      '&:hover': {
        color: 'red'
      }
    }
  });
  
  export default styles;