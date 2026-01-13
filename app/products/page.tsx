import React from 'react';
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
    title: 'Product Categories Hub | Sun Enterprises',
    description: 'Explore our suite of sustainable agriculture solutions designed to maximize efficiency and crop health.',
};

export default function ProductsPage() {
    return <ProductsClient />;
}
