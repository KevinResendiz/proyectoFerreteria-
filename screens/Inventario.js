import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import axios from 'axios';

const BASE_URL = "http://127.0.0.1:3000/api/productos";

const Inventario = () => {
    const [productos, setProductos] = useState([]);
    const [editando, setEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [activo, setActivo] = useState(true);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const response = await axios.get(BASE_URL);
            setProductos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const registrarProducto = async () => {
        try {
            const producto = { id, nombre, proveedor, precio, cantidad, activo: activo ? 1 : 0 };
            await axios.post(BASE_URL, producto, {
                headers: { 'Content-Type': 'application/json' },
            });
            setMostrarFormulario(false);
            obtenerProductos();
        } catch (error) {
            console.error(error);
        }
    };

    const actualizarProducto = async (producto) => {
        try {
            await axios.put(`${BASE_URL}/${producto.id}`, producto, {
                headers: { 'Content-Type': 'application/json' },
            });
            setEditando(null);
            obtenerProductos();
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => {
        if (editando === item.id) {
            return (
                <View style={styles.productItem}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Nombre Producto" 
                        value={item.nombre} 
                        onChangeText={(text) => setProductos(productos.map(p => p.id === item.id ? { ...p, nombre: text } : p))}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Proveedor" 
                        value={item.proveedor} 
                        onChangeText={(text) => setProductos(productos.map(p => p.id === item.id ? { ...p, proveedor: text } : p))}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Precio" 
                        value={item.precio.toString()} 
                        onChangeText={(text) => setProductos(productos.map(p => p.id === item.id ? { ...p, precio: parseFloat(text) } : p))}
                        keyboardType="numeric"
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Cantidad" 
                        value={item.cantidad.toString()} 
                        onChangeText={(text) => setProductos(productos.map(p => p.id === item.id ? { ...p, cantidad: parseInt(text) } : p))}
                        keyboardType="numeric"
                    />
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Activo</Text>
                        <Switch
                            value={item.activo}
                            onValueChange={(value) => setProductos(productos.map(p => p.id === item.id ? { ...p, activo: value } : p))}
                        />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={() => actualizarProducto(item)}> 
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.productItem}>
                    <Text style={styles.productText}>{item.nombre}</Text>
                    <Text style={styles.productText}>Proveedor: {item.proveedor}</Text>
                    <Text style={styles.productText}>Precio: ${item.precio}</Text>
                    <Text style={styles.productText}>Cantidad: {item.cantidad}</Text>
                    <Text style={styles.productText}>Activo: {item.activo ? 'Sí' : 'No'}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditando(item.id)}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.header}>Inventario de Productos</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => setMostrarFormulario(!mostrarFormulario)}>
                    <Text style={styles.buttonText}>Añadir Producto</Text>
                </TouchableOpacity>
                {mostrarFormulario && (
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Registrar Producto</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="ID Producto" 
                            value={id} 
                            onChangeText={setId}
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nombre Producto" 
                            value={nombre} 
                            onChangeText={setNombre}
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Proveedor" 
                            value={proveedor} 
                            onChangeText={setProveedor}
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Precio" 
                            value={precio} 
                            onChangeText={setPrecio}
                            keyboardType="numeric"
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Cantidad" 
                            value={cantidad} 
                            onChangeText={setCantidad}
                            keyboardType="numeric"
                        />
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Activo</Text>
                            <Switch
                                value={activo} 
                                onValueChange={setActivo}
                            />
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={registrarProducto}>
                            <Text style={styles.buttonText}>Registrar Producto</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <FlatList
                    data={productos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF8E1', // Fondo claro
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    section: {
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#007bff',
    },
    input: {
        height: 40,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#FAFAFA',
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    productItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    switchLabel: {
        marginRight: 10,
    },
});

export default Inventario;
