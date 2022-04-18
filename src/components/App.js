import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

//modules
import DocumentationViewer from 'components/DocumentationViewer';

//classes
import Viewer from 'components/Viewer/GitViewer';
import Builder from 'components/Viewer/GitBuilder';
import Searcher from 'components/Viewer/GitSearcher';

//assets
import 'react-perfect-scrollbar/dist/css/styles.css';

class App extends Component {

  render() {
    const theme = createMuiTheme({
      palette: {
          type: this.props.theme
      },
      typography: {
        useNextVariants: true,
      }
    });

    const builder = <Builder/>;
    const searcher = <Searcher/>;
    const viewer = <Viewer />;

    return (
      <MuiThemeProvider theme={theme}>
        <DocumentationViewer 
          className={`${this.props.theme}`}
          viewer={viewer}
          builder={builder}
          searcher={searcher}
        />
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, null)(App);
