export default function generateOrderId() {
    return new Date().getFullYear() + '-' + Math.round(Math.random() * 1000000);
}