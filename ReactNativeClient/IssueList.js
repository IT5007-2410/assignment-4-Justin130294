import React, {useState} from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Picker} from '@react-native-picker/picker';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    /****** Q4: Start Coding here. State the correct IP/port******/
    const response = await fetch('http://10.0.2.2:3000/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query, variables}),
      /****** Q4: Code Ends here******/
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueFilter extends React.Component {
  render() {
    return (
      <View>
        {/****** Q1: Start Coding here. ******/}
        <Text style={styles.filterPlaceholder}>Issue Filter Placeholder</Text>
        {/****** Q1: Code ends here ******/}
      </View>
    );
  }
}

// Create styles
const styles = StyleSheet.create({
  // Filter component
  filterPlaceholder: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  // Styling for the view components
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 100,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  // Title for each page
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  // Table header
  header: {
    height: 50,
    backgroundColor: '#537791',
  },
  // Table row
  row: {
    backgroundColor: '#E7E6E1',
  },
  // Table border
  tableBorder: {borderWidth: 2},
  // Table header text
  headerText: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',
    fontSize: 16,
  },
  // Table text
  text: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 16,
  },

  // Add issue input
  input: {
    height: 45,
    width: '90%',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    fontSize: 16,
  },
  // Add issue label
  label: {
    padding: 10,
    fontWeight: 700,
    fontSize: 20,
  },
  // Select downdown picker
  picker: {
    height: 60,
    width: '90%',
    marginLeft: 10,
    backgroundColor: '#e0e0e0',
  },
  // Select option
  pickerItem: {
    fontSize: 20,
    color: '#000',
  },

  // Submit button
  submitButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#537791',
    width: '50%',
    padding: 10,
    borderRadius: 5,
  },
  // Blacklist button (additional styling)
  backlistButtonContainer: {
    paddingBottom: 250,
  },
  // Apply padding to scroll view
  scrollViewContainer: {
    paddingBottom: 150,
  },

  // Navbar
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#537791',
  },
  navBarButton: {
    width: '33%',
    padding: 15,
    backgroundColor: '#537791',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 5,
  },
  navBarButtonActive: {
    backgroundColor: '#2a4d69', // Change to desired active color
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 18,
  },
  icon: {fontSize: 24},
});

// Width in percentages for each column in the table
const widthP = ['5%', '15%', '15%', '17.5%', '12.5%', '12.5%', '22.5%'];

// Component for rendering a row in the issues table
function IssueRow(props) {
  const issue = props.issue;
  {
    /****** Q2: Coding Starts here. Create a row of data in a variable******/
  }
  const rowData = [
    issue.id,
    issue.status,
    issue.owner,
    issue.created?.toDateString(),
    issue.effort,
    issue.due?.toDateString(),
    issue.title,
  ];

  {
    /****** Q2: Coding Ends here.******/
  }
  return (
    <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Row
        data={rowData}
        style={styles.row}
        textStyle={styles.text}
        borderStyle={styles.tableBorder}
        widthArr={widthP}
      />

      {/****** Q2: Coding Ends here. ******/}
    </>
  );
}

// Component for rendering the issues table
function IssueTable(props) {
  // Map each issue to a row in the table
  const issueRows = props.issues.map(issue => (
    <IssueRow key={issue.id} issue={issue} />
  ));

  {
    /****** Q2: Start Coding here. Add Logic to initalize table header  ******/
  }
  // Create the variable with the labels for the table header
  const tableHeader = [
    'ID',
    'Status',
    'Owner',
    'Created',
    'Effort',
    'Due Date',
    'Title',
  ];
  {
    /****** Q2: Coding Ends here. ******/
  }

  return (
    <View style={styles.container}>
      {/****** Q2: Start Coding here to render the table header/rows.**********/}
      <Text style={styles.title}>Issues Table</Text>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableHeader}
          style={styles.header}
          textStyle={styles.headerText}
          borderStyle={styles.tableBorder}
          widthArr={widthP}
        />
        {issueRows}
      </Table>
      {/****** Q2: Coding Ends here. ******/}
    </View>
  );
}

// Add Issue Component
class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q3: Start Coding here. Create State to hold inputs******/
    // Initialize the state variables for the add issue form
    this.state = {
      owner: '',
      status: 'New',
      effort: '',
      due: '',
      title: '',
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handlePickerChange = this.handlePickerChange.bind(this);
    /****** Q3: Code Ends here. ******/
  }

  /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  // Function to handle changes in the text input fields
  handleTextInputChange(text, field) {
    this.setState({[field]: text});
  }

  // Function to handle changes in the picker field (dropdown)
  handlePickerChange(itemValue) {
    this.setState({status: itemValue});
  }
  /****** Q3: Code Ends here. ******/

  async handleSubmit() {
    /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
    // Input validation (perform the same validation as the backend server to mimic the logic)
    // Check if the title is less than 3 characters long
    if (this.state.title.length < 3) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Title must be at least 3 characters long',
        visibilityTime: 2000,
      });
      return;
    }
    // Check if there is no owner if the status is 'Assigned'
    if (this.state.status === 'Assigned' && this.state.owner === '') {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Owner is required if status is Assigned',
        visibilityTime: 2000,
      });
      return;
    }
    // Check if the date is in the correct format
    if (!dateRegex.test(this.state.due)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Date must be in the format yyyy-mm-dd',
        visibilityTime: 2000,
      });
      return;
    }
    const dateParts = this.state.due.split('-');
    // Check that the month is between 1 and 12
    if (dateParts[1] < 1 || dateParts[1] > 12) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Month must be between 1 and 12',
        visibilityTime: 2000,
      });
      return;
    }
    // Check that the day is between 1 and 31
    if (dateParts[2] < 1 || dateParts[2] > 31) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Day must be between 1 and 31',
        visibilityTime: 2000,
      });
      return;
    }
    // Convert the date string to a date object
    const processedDate = jsonDateReviver('', this.state.due);
    // Check if the date object was obtained. If it remains a string, the date was invalid
    if (processedDate === this.state.due) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Date must be in the format yyyy-mm-dd',
        visibilityTime: 2000,
      });
      return;
    }

    // Check that the effort is a number and the field is not empty
    if (this.state.effort === '' || isNaN(Number(this.state.effort))) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Effort must be a number',
        visibilityTime: 2000,
      });
      return;
    }

    // Create the issue object from the state variables to be sent to the server
    const issue = {
      owner: this.state.owner,
      status: this.state.status,
      effort: Number(this.state.effort),
      due: processedDate,
      title: this.state.title,
    };

    // Call the createIssue function to add the issue to the database via the GraphQL server
    const data = await this.props.createIssue(issue);

    // Display a success message if the issue was added successfully (if an ID was returned)
    if (data.issueAdd.id) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Issue ${data.issueAdd.id} added successfully`,
        visibilityTime: 2000,
      });

      // Clear the form if the issue was added successfully
      this.setState({
        owner: '',
        status: 'New',
        effort: '',
        due: '',
        title: '',
      });
    }

    /****** Q3: Code Ends here. ******/
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.container, styles.form]}>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <Text style={styles.title}>Add Issue</Text>
          <View>
            <Text style={styles.label}>Owner</Text>
            <TextInput
              style={styles.input}
              placeholder="Owner"
              onChangeText={value => this.handleTextInputChange(value, 'owner')}
              value={this.state.owner}
            />
          </View>
          <View>
            <Text style={styles.label}>Status</Text>
            <Picker
              style={styles.picker} // Style for the Picker container
              itemStyle={styles.pickerItem}
              dropdownIconColor="#000"
              selectedValue={this.state.status}
              onValueChange={itemValue => this.handlePickerChange(itemValue)}>
              <Picker.Item label="New" value="New" />
              <Picker.Item label="Assigned" value="Assigned" />
              <Picker.Item label="Fixed" value="Fixed" />
              <Picker.Item label="Closed" value="Closed" />
            </Picker>
          </View>

          <View>
            <Text style={styles.label}>Effort</Text>
            <TextInput
              style={styles.input}
              placeholder="Effort"
              onChangeText={value =>
                this.handleTextInputChange(value, 'effort')
              }
              keyboardType="numeric"
              textContentType="numeric"
              value={this.state.effort}
            />
          </View>
          <View>
            <Text style={styles.label}>Due Date (yyyy-mm-dd)</Text>
            <TextInput
              style={styles.input}
              placeholder="Due Date"
              onChangeText={value => this.handleTextInputChange(value, 'due')}
              value={this.state.due}
            />
          </View>
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={value => this.handleTextInputChange(value, 'title')}
              value={this.state.title}
            />
          </View>
          <View style={[styles.submitButtonContainer]}>
            <Pressable
              style={[styles.submitButton]}
              onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Add Issue</Text>
            </Pressable>
          </View>

          {/****** Q3: Code Ends here. ******/}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

class BlackList extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q4: Start Coding here. Create State to hold inputs******/
    // Have checked with Prof that it is ok to use owner, despite the possibility of duplicate names
    this.state = {owner: ''};
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    /****** Q4: Code Ends here. ******/
  }
  /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  // Function to handle changes in the text input field
  handleTextInputChange(text) {
    this.setState({owner: text});
  }
  /****** Q4: Code Ends here. ******/

  async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    // Check that the owner name is not empty
    if (this.state.owner === '') {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Owner name cannot be blank',
        visibilityTime: 2000,
      });
      return;
    }

    // Create the GraphQL mutation to add the owner to the blacklist
    const mutation = `mutation addToBacklist($nameInput: String!) {
      addToBlacklist(nameInput: $nameInput)
    }`;

    // Send the mutation to the server to add the owner to the blacklist
    await graphQLFetch(mutation, {nameInput: this.state.owner});

    // Display a success message if the owner was added to the blacklist
    Toast.show({
      type: 'success',
      text1: 'Blacklist',
      text2: `${this.state.owner} has been blacklisted`,
      visibilityTime: 2000,
    });

    // Clear the input field after the owner has been blacklisted
    this.setState({owner: ''});
    /****** Q4: Code Ends here. ******/
  }

  render() {
    return (
      <View style={[styles.container, styles.form]}>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text style={styles.title}>Blacklist Owner</Text>
        <View>
          <Text style={styles.label}>Owner</Text>
          <TextInput
            style={styles.input}
            placeholder="Owner"
            value={this.state.owner}
            onChangeText={this.handleTextInputChange}
          />
        </View>
        <View
          style={[
            styles.submitButtonContainer,
            styles.backlistButtonContainer,
          ]}>
          <Pressable
            style={[styles.submitButton]}
            onPress={() => {
              this.handleSubmit();
            }}>
            <Text style={styles.buttonText}>Blacklist Owner</Text>
          </Pressable>
        </View>

        {/****** Q4: Code Ends here. ******/}
      </View>
    );
  }
}

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {issues: [], view: 'table'};
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({issues: data.issueList});
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, {issue});
    if (data) {
      this.loadData();
      return data;
    }
  }

  render() {
    return (
      <>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/****** Q1: Start Coding here. ******/}
          {/* Only render the issue filter with the table in the table tab (which makes sense) */}
          {this.state.view === 'table' && <IssueFilter />}
          {/****** Q1: Code ends here ******/}

          {/****** Q2: Start Coding here. ******/}
          {this.state.view === 'table' && (
            <IssueTable issues={this.state.issues} />
          )}
          {/****** Q2: Code ends here ******/}

          {/****** Q3: Start Coding here. ******/}
          {this.state.view === 'add' && (
            <IssueAdd createIssue={this.createIssue} />
          )}
          {/****** Q3: Code Ends here. ******/}

          {/****** Q4: Start Coding here. ******/}
          {this.state.view === 'blacklist' && <BlackList />}
          {/****** Q4: Code Ends here. ******/}
        </ScrollView>

        {/* Navbar with Issues Table, Add Issue and Blacklist tabs */}
        <View style={[styles.navBar]}>
          <Pressable
            style={[
              styles.navBarButton,
              this.state.view === 'table' && styles.navBarButtonActive,
            ]}
            onPress={() => {
              this.setState({view: 'table'});
            }}>
            <Text style={[styles.buttonText, styles.icon]}>🔎</Text>
            <Text style={styles.buttonText}>Issues</Text>
          </Pressable>
          <Pressable
            style={[
              styles.navBarButton,
              this.state.view === 'add' && styles.navBarButtonActive,
            ]}
            onPress={() => {
              this.setState({view: 'add'});
            }}>
            <Text style={[styles.buttonText, styles.icon]}>📝</Text>
            <Text style={styles.buttonText}>Add Issue</Text>
          </Pressable>
          <Pressable
            style={[
              styles.navBarButton,
              this.state.view === 'blacklist' && styles.navBarButtonActive,
            ]}
            onPress={() => {
              this.setState({view: 'blacklist'});
            }}>
            <Text style={[styles.buttonText, styles.icon]}>❌</Text>
            <Text style={styles.buttonText}>Blacklist</Text>
          </Pressable>
        </View>
      </>
    );
  }
}
