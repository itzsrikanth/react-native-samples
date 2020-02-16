import React from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

const INITIAL_VALUE = {
  count: 2,
};

const reducer = (state = INITIAL_VALUE, action) => {
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

const store = createStore(reducer);

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
  triggerAction = type => {
    console.log(type);
    this.props.dispatch({
      type,
    });
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <Button
            key={1}
            title="-"
            style={styles.button}
            onPress={() => this.triggerAction('DECREMENT')}
          />
          <TextInput style={styles.text} value={this.props.count.toString()} />
          <Button
            key={2}
            title="+"
            style={styles.button}
            onPress={() => this.triggerAction('INCREMENT')}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.count,
  };
};

const CounterStore = connect(mapStateToProps)(Counter);

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
