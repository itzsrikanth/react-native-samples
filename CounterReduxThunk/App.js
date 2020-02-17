import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';

// const INITIAL_VALUE = ;

const reducer = (
  state = {
    count: 45,
  },
  action,
) => {
  console.log(action.type);
  const actionTypes = {
    INCREMENT: {
      count: state.count + 1,
    },
    DECREMENT: {
      count: state.count - 1,
    },
  };
  console.log(actionTypes[action.type] || state);
  return actionTypes[action.type] || state;
};

const store = createStore(
  combineReducers({reducer}),
  {},
  applyMiddleware(thunk),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'red',
    borderWidth: 1,
    color: 'green',
  },
  text: {height: 40, borderWidth: 1},
});

class Counter extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Button
            key={1}
            title="-"
            style={styles.button}
            onPress={this.props.dec}
          />
          <TextInput style={styles.text} value={this.props.count.toString()} />
          <Button
            key={2}
            title="+"
            style={styles.button}
            onPress={this.props.inc}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  count: state.reducer.count,
});

const incCount = () => dispatch => {
  setTimeout(() => {
    dispatch({
      type: 'INCREMENT',
    });
  }, 2500);
};

const decCount = () => ({
  type: 'DECREMENT',
});

const mapDispatchToProps = dispatch => ({
  inc: () => dispatch(incCount()),
  dec: () =>  dispatch(decCount()),
});

const CounterStore = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CounterStore />
      </Provider>
    );
  }
}

export default App;
