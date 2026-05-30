let currentUser = null;
function initDefaultUsers() {
    if (!localStorage.getItem('medmovil_users')) {
        localStorage.setItem('medmovil_users', JSON.stringify([
            { id: 1, name: "Administrador", email: "admin@medmovil.com", password: "admin123", role: "admin" },
            { id: 2, name: "Usuario Demo", email: "demo@medmovil.com", password: "demo123", role: "user" }
        ]));
    }
}
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('medmovil_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = { id: user.id, name: user.name, email: user.email, role: user.role };
        localStorage.setItem('medmovil_session', JSON.stringify(currentUser));
        return { success: true, message: "Bienvenido " + user.name };
    }
    return { success: false, message: "Email o contraseña incorrectos" };
}
function logoutUser() { localStorage.removeItem('medmovil_session'); currentUser = null; }
function checkSession() { const s = localStorage.getItem('medmovil_session'); if(s){ currentUser = JSON.parse(s); return currentUser; } return null; }
initDefaultUsers(); checkSession();
window.auth = { login: loginUser, logout: logoutUser, checkSession: checkSession };
