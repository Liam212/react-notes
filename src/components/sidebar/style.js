const styles = theme => ({
    root: {
      height: '100%',
      position: 'fixed',
      left: '0',
      width: '300px',
      overflow: 'auto',
      paddingRight: '0px'
    },
    newNoteBtn: {
      width: '100%',
      height: '50px',
      borderBottom: '1px solid black',
      borderRadius: '0px',
      backgroundColor: '#29487d',
      color: 'white',
      '&:hover': {
        backgroundColor: '#88a2ce'
      }
    },
    sidebarContainer: {
      marginTop: '0px',
      width: '300px',
      height: '100%',
      boxSizing: 'border-box',
      float: 'left',
      overflowY: 'scroll',
      overflowX: 'hidden'
    },
    newNoteInput: {
      width: '100%',
      margin: '0px',
      height: '35px',
      outline: 'none',
      border: 'none',
      paddingLeft: '5px',
      '&:focus': {
        outline: '2px solid rgba(81, 203, 238, 1)'
      }
    },
    newNoteSubmitBtn: {
      width: '100%',
      backgroundColor: '#28787c',
      borderRadius: '0px',
      color: 'white'
    },
    signOutBtn: {
      position: 'absolute',
      bottom: '0px',
      left: '0px',
      width: '300px',
      borderRadius: '0px',
      backgroundColor: '#227092',
      height: '50x',
      boxShadow: '0px 0px 2px black',
      color: 'white'
    }  
  });
  
  export default styles;