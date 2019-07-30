import React, { Component } from 'react';
import api from "../../services/api";

import './style.css';

    export default class Main extends Component{

        state = {
        products: []

        };

    //montagem dos produtos no componente
    componentDidMount(){

        this.loadProducts();

    }

    //recuperando a listagem dos produtos
    loadProducts = async () => {

      const response = await api.get()

      this.setState({ products: response.data});

    };

        //função para adicionar e remover um produto
        addAndRem = (idComprando) => {

            let product = this.state.products[idComprando];

            //verifica se o mesmo já foi comprado
            if(product.comprado){
                product.comprado = false;
            } else {
                product.comprado = true;
            }

            //grava as informações no state
            this.setState({ products : this.state.products })

        }


    render() {

        const { products } = this.state;

        //método filter() selecionar apenas os produtos escolhidos
        let comprados = this.state.products.filter( function (products) {
            return products.comprado === true
        });

       //método reduce() para somar os valores encontrados
        var totalPedido = comprados.reduce((sum, product) => {
            return sum + product.valor;
        }, 0);

      return (
          <div className="container">
              <nav className="main-nav">
                  <p>{comprados.length} {comprados.length<=1 ? 'Item' : 'Itens'} - Valor Total {totalPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  <button className="btn-submit">Confirmar</button>
                  </p>
                  </nav>
            <div className="product-list">
                {products.map((product, index) => (
                    <article key={index} disabled={product.comprado} >
                        <h3>{product.sabor}</h3>
                        <p>Marca: {product.marca}</p>
                        <p>Tamanho: {product.quantidade}</p>
                        <p>Valor: R$ {product.valor}</p>
                        <p>Like: {product.curtidas}</p>
                        <div className="actions">
                            <button disabled={!product.comprado} className="rem" onClick={()=>{this.addAndRem(index)}}>Remover</button>
                            <button disabled={product.comprado} className="add" onClick={()=>{this.addAndRem(index)}}>Adicionar</button>
                        </div>
                    </article>
                ))}
            </div>
          </div>
        );
    }
}
