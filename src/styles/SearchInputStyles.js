import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    marginRight: 10, 
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  searchButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 