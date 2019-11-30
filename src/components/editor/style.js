const styles = theme => ({
    body: {
      height: '100%'
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      marginLeft: '200px',
      padding: '1px 16px',
      height: '1000px'
    },
    titleInput: {
      height: '50px',
      boxSizing: 'border-box',
      border: 'none',
      padding: '5px',
      fontSize: '24px',
      width: 'calc(100% - 300px)',
      backgroundColor: '#29487d',
      color: 'white',
      paddingLeft: '50px'
    },
    editIcon: {
      position: 'absolute',
      left: '310px',
      top: '12px',
      color: 'white',
      width: '10',
      height: '10'
    },
    editorContainer: {
      height: '100%',
    }
  });
  
  export default styles;