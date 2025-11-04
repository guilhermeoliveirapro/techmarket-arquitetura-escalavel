document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    const cpfInput = document.getElementById('cpf');
    const dataNascimentoInput = document.getElementById('dataNascimento');
    const telefoneInput = document.getElementById('telefone');

    // Mapeamento dos elementos de erro
    const erroCpf = document.getElementById('erro-cpf');
    const erroData = document.getElementById('erro-data');
    const erroTelefone = document.getElementById('erro-telefone');

    // Funções de Validação
    
    // 1. CPF: exige 11 dígitos numéricos.
    const validarCPF = () => {
        const cpf = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
            erroCpf.textContent = 'CPF deve ter exatamente 11 dígitos numéricos.';
            return false;
        }
        erroCpf.textContent = '';
        return true;
    };

    // 2. Data de nascimento: deve ser anterior à data atual.
    const validarDataNascimento = () => {
        const dataNasc = new Date(dataNascimentoInput.value);
        const hoje = new Date();

        if (dataNasc >= hoje) {
            erroData.textContent = 'Data de nascimento deve ser anterior à data atual.';
            return false;
        }
        erroData.textContent = '';
        return true;
    };

    // 3. Telefone: aceita 10 ou 11 dígitos (com ou sem DDD).
    const validarTelefone = () => {
        const telefone = telefoneInput.value.replace(/\D/g, '');
        // Verifica 10 (c/ DDD, sem 9) ou 11 dígitos (c/ DDD, c/ 9)
        if (!/^\d{10,11}$/.test(telefone)) { 
            erroTelefone.textContent = 'Telefone inválido. Use 10 ou 11 dígitos (incluindo DDD).';
            return false;
        }
        erroTelefone.textContent = '';
        return true;
    };

    // 4. Validação em Tempo Real (Usabilidade)
    cpfInput.addEventListener('blur', validarCPF);
    dataNascimentoInput.addEventListener('blur', validarDataNascimento);
    telefoneInput.addEventListener('blur', validarTelefone);

    // 5. Validação no Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão

        // Executa todas as validações novamente
        const isCpfValid = validarCPF();
        const isDataValid = validarDataNascimento();
        const isTelValid = validarTelefone();

        if (isCpfValid && isDataValid && isTelValid) {
            alert('Cadastro validado com sucesso! Dados prontos para envio.');
            // Aqui o código real enviaria os dados para a API
        } else {
            alert('Por favor, corrija os erros do formulário antes de enviar.');
        }
    });
});