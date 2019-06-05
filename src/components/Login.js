import React, { Component } from 'react'
import { Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { Icon, Container, Input, Content, Button, Text, Form, Item, Label, View, Header, Left, Body, Title } from 'native-base';
import { iOSUIKit, material, materialColors, iOSColors } from 'react-native-typography';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { login } from '../actions';


const { width, height } = Dimensions.get('window');

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header noShadow style={{ width }}>
                    <Left>
                        <Button onPress={() => Actions.pop()} transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Giriş Yap</Title>
                    </Body>
                </Header>
                <Content style={styles.content}>
                    {this.props.loading ?
                        <View style={{ flex: 9, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={iOSColors.blue} />
                        </View>
                        :
                        <Form style={styles.form}>
                            <Icon style={{ marginBottom: 20, fontSize: 80, color: iOSColors.tealBlue }} name="aperture" ></Icon>
                            <Item rounded style={{ marginBottom: 20 }}>
                                <Icon style={{ color: iOSColors.blue }} active name='at' />
                                <Label style={styles.labels}>e-Posta Adresi:</Label>
                                <Input
                                    value={this.state.email}
                                    onChangeText={(email) => { this.setState({ email }) }}
                                    keyboardType="email-address"
                                />
                            </Item>
                            <Item rounded style={{ marginBottom: 20 }}>
                                <Icon style={{ color: iOSColors.blue }} active name='key' />
                                <Label style={styles.labels}>Şifre:</Label>
                                <Input
                                    value={this.state.password}
                                    onChangeText={(password) => { this.setState({ password }) }}
                                    secureTextEntry keyboardType="number-pad" />
                            </Item>
                            <View style={styles.buttons}>
                                <Button
                                    onPress={() => this.props.login(this.state.email, this.state.password)}
                                    block iconLeft primary>
                                    <Icon name='log-in' />
                                    <Text>Giriş Yap</Text>
                                </Button>
                            </View>
                        </Form>
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row'
    },
    form: {
        alignItems: 'center',
        width: width * 0.95,
        flex: 8,
        justifyContent: 'center'
    },
    buttons: {
        ...material.titleWhite,
        color: materialColors.whitePrimary,
        flexDirection: 'column',
        width: width * 0.9,
    },
    labels: {
        ...material.caption,
        color: iOSColors.gray
    }
});

const mapStatsToProps = ({ authResponse }) => {
    console.log(authResponse);
    return { loading: authResponse.loading }
}
export default connect(mapStatsToProps, { login })(Login)