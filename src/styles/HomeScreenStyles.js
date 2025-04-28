import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20,
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    title: { 
        fontSize: 28, 
        fontWeight: 'bold',
    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    themeLabel: {
        marginRight: 10,
        fontSize: 16,
    },
    body: { 
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    error: { 
        textAlign: 'center', 
        fontSize: 16,
        fontWeight: '500',
    },
    clearButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 10
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
}); 