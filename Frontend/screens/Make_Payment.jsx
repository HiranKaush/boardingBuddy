import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const MakePayment = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const {
        boardingLocation,
        gender,
        price,
        description,
        userId,
        imgURL
    } = route.params || {};


    const handleAddBoarding = async () => {
        console.log("uid", userId);

        console.log('Adding Boarding:', boardingLocation, gender, price, description, imgURL);


        try {
            const response = await axios.post(
              "http://192.168.1.13:8000/api/boardings",
              {
                boardingLocation,
                gender,
                price,
                description,
                userId,
                imgURL
              }
            );

            console.log("Boarding added:", response.data);

        } catch (error) {
            console.error("Error adding boarding:", error);

        }
    };

    const handleCardSelection = (card) => {
        setSelectedCard((prevSelectedCard) =>
            prevSelectedCard === card ? null : card
        );
    };

    const handleDeleteCard = (cardId) => {
        // Send a DELETE request to the server to delete the card
        console.log(cardId)
        fetch(`http://192.168.1.13:8000/api/cards/${cardId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 204) {
                    // Card deleted successfully
                    fetchCards(); // Refresh the card list after deletion
                } else if (response.status === 404) {
                    console.error('Error deleting card: Card not found');
                } else {
                    console.error('Error deleting card: ' + response.status + ' ' + response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error deleting card:', error);
            });
    };



    const handlePayment = () => {
        if (selectedCard) {
            const paymentUrl = 'http://192.168.1.13:8000/api/payments';
            const paymentData = {
                card: selectedCard,
                cardNumber: selectedCard.cardNumber,
            };
            fetch(paymentUrl, {
                method: 'POST',
                body: JSON.stringify(paymentData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Payment Successful:', data);
                    setIsPaymentSuccessful(true);
                    handleAddBoarding();
                    navigation.navigate('Get_LL_boardings')
                })
                .catch((error) => {
                    console.error('Error processing payment:', error);
                });
        }
    };

    const fetchCards = () => {
        const apiUrl = 'http://192.168.1.13:8000/api/cards';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setCards(data);
            })
            .catch((error) => {
                console.error('Error fetching card details:', error);
            });
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.makePayment} >Make Payment</Text>
            </View>

            <View style={styles.header2}>
                <Text >Cards</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CardDetails')}
                    style={styles.plusButton}
                >
                    <FontAwesome name="plus" size={20} color="blue" />
                </TouchableOpacity>
            </View>

            {cards.map((card, index) => (
                <View key={index} style={styles.cardContainer}>
                    <TouchableOpacity onPress={() => handleCardSelection(card)}>
                        <View style={styles.radio}>
                            {selectedCard === card && (
                                <View style={styles.radioDot} />
                            )}
                        </View>
                        <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDeleteCard(card._id)}
                        style={styles}
                    >
                        <FontAwesome name="trash" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            ))}

            <Text>Ad fee : Rs.1500.00</Text>
            <TouchableOpacity
                style={[styles.makePaymentButton, { backgroundColor: '#1F9E28' }]}
                onPress={handlePayment}
                disabled={!selectedCard}
            >
                <Text style={styles.makePaymentButtonText}>Make Payment</Text>
            </TouchableOpacity>

            <Modal visible={isPaymentSuccessful} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Payment Successful!</Text>
                        <TouchableOpacity onPress={() => setIsPaymentSuccessful(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 100,
        marginTop: -200
    },
    header2: {
        flexDirection: 'row',
        marginBottom: 30,
        backgroundColor: 'lightgray',
        width: 320,
        height: 30,
        paddingTop: 5,
        paddingLeft: 10

    },
    makePayment: {
        fontSize: 22,

    },
    plusButton: {
        marginLeft: 230,
    },
    backButton: {
        marginRight: 100,
        marginLeft: -100
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginLeft: 20,
        width: 250
    },
    radio: {
        width: 17,
        height: 17,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007BFF',

    },
    radioDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#007BFF',
    },
    cardNumber: {
        fontSize: 15,
    },
    deleteButton: {
        marginLeft: 80,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: 300,
        height: 400
    },
    modalText: {
        paddingTop: 70,
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    makePaymentButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 50
    },
    makePaymentButtonText: {
        color: 'white',
        fontSize: 18,

    },
    closeButtonText: {
        color: 'blue',
        fontSize: 20,
        marginTop: 150,
        paddingLeft: 100,
        backgroundColor: 'lightgray',
        height: 24,

    },
});

export default MakePayment;
