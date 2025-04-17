const axios = require('axios');

// Function to validate a single product
function validateProduct(product) {
    const errors = [];

    // Check if title is empty
    if (!product.title || product.title.trim() === '') {
        errors.push('Empty title');
    }

    // Check if price is negative
    if (product.price < 0) {
        errors.push('Negative price');
    }

    // Check if rating.rate exceeds 5
    if (product.rating && product.rating.rate > 5) {
        errors.push('Rating exceeds 5');
    }

    return {
        product,
        errors
    };
}

// Function to fetch and validate all products
async function validateProducts() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        
        // Validate response status code
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }

        // Validate each product
        const validationResults = response.data.map(validateProduct);
        
        // Filter products with errors
        const productsWithErrors = validationResults.filter(result => result.errors.length > 0);

        return {
            totalProducts: response.data.length,
            productsWithErrors,
            validationResults
        };
    } catch (error) {
        throw new Error(`API request failed: ${error.message}`);
    }
}

// Test suite
describe('Fake Store API Validation', () => {
    let validationResults;

    beforeAll(async () => {
        validationResults = await validateProducts();
    });

    test('API should return status code 200', async () => {
        const response = await axios.get('https://fakestoreapi.com/products');
        expect(response.status).toBe(200);
    });

    test('All products should have valid data', () => {
        expect(validationResults.productsWithErrors.length).toBe(0);
    });

    test('No product should have empty title', () => {
        const productsWithEmptyTitles = validationResults.validationResults
            .filter(result => result.errors.includes('Empty title'));
        expect(productsWithEmptyTitles.length).toBe(0);
    });

    test('No product should have negative price', () => {
        const productsWithNegativePrices = validationResults.validationResults
            .filter(result => result.errors.includes('Negative price'));
        expect(productsWithNegativePrices.length).toBe(0);
    });

    test('No product should have rating exceeding 5', () => {
        const productsWithInvalidRatings = validationResults.validationResults
            .filter(result => result.errors.includes('Rating exceeds 5'));
        expect(productsWithInvalidRatings.length).toBe(0);
    });

    // Helper function to print products with errors
    test('Print products with errors', () => {
        if (validationResults.productsWithErrors.length > 0) {
            console.log('\nProducts with errors:');
            validationResults.productsWithErrors.forEach(({ product, errors }) => {
                console.log(`\nProduct ID: ${product.id}`);
                console.log(`Title: ${product.title}`);
                console.log(`Price: ${product.price}`);
                console.log(`Rating: ${product.rating?.rate}`);
                console.log('Errors:', errors);
            });
        }
    });
}); 