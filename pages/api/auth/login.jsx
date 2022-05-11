export default function Login(req, res) {
    res.redirect(
        'https://award-demo.clquu.repl.co/v1/auth/login?__b=' + 
        (process.env.NODE_ENV === 'production' ? 'false' : 'true') + 
        '&url=' + (req.query.url || '/')
    );
};