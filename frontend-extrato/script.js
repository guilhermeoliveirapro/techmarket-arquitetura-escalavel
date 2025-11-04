document.addEventListener('DOMContentLoaded', ()=> {
    const dadosExtrato = {
        saldo:12570.35,
        transacoes:[
            { tipo: 'venda', descricao: 'Venda - Fone Bluetooth TechSound', valor: 169.90},
            { tipo: 'venda', descricao: 'Venda - Mouse Gamer Atack Shark X11', valor: 229.30},
            { tipo: 'pix', descricao: 'Pagamento fornecedor - TrapEletro', valor: -7800.00},
            { tipo: 'cashback', descricao: 'Cashback BlackFriday', valor: 120.00},
            { tipo: 'compra', descricao: 'Compra - Estoque de SSDs NVMe', valor: -9800.00},
            { tipo: 'taxa', descricao: 'Taxa de Intermediação - FastPay', valor: -150.00},
            { tipo: 'venda', descricao: 'Venda - Teclado Mecânico Machenike', valor: 330.50},
            { tipo: 'pix', descricao: 'Recebido via Pix - Cliente Pedro Cabral', valor: 450.00},
            { tipo: 'reembolso', descricao: 'Reembolso Cliente - Pedido #4242', valor: -339.90},
            { tipo: 'serviço', descricao: 'Assinatura TechMarket+ (Mensal)', valor: -59.90},
        ]
    };

    const saldoElemento = document.getElementById('saldo-conta');
    const listaTransacoesElemento = document.getElementById('lista-transacoes')

    saldoElemento.textContent = `Saldo ${dadosExtrato.saldo.toLocaleString('pt-BR', {
        style:'currency', 
        currency:'BRL'
    })}`

    dadosExtrato.transacoes.forEach(transacao=>{
        const itemLista = document.createElement('li');
        itemLista.classList.add('transacao');

        if(Math.abs(transacao.valor) >= 5000){
            itemLista.classList.add('destaque');
        }

        const ValorFormatado = new Intl.NumberFormat('pt-BR',{
            style:'currency', 
            currency:'BRL'
        }).format(transacao.valor);

        itemLista.innerHTML = `
        <div class="transacao-info">
            <span> ${transacao.descricao}</span>
            <small> ${transacao.tipo}</small> 
            <span class="transacao-valor ${transacao.valor < 0 ? 'negativo' : ''}"> 
                ${ValorFormatado}
            </span> 
        </div>`;
        
        listaTransacoesElemento.appendChild(itemLista); 
    })
})