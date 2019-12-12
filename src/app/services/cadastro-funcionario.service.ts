import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CadastroFuncionario } from '../interfaces/cadastro-funcionario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroFuncionarioService {
  private cadastroCollection: AngularFirestoreCollection<CadastroFuncionario>;

  constructor(private afs: AngularFirestore) { 
    this.cadastroCollection = this.afs.collection<CadastroFuncionario>('CadastroFuncionario');
  }

  getCadastros(){
    return this.cadastroCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addCadastro(cadastro: CadastroFuncionario){
    return this.cadastroCollection.add(cadastro);
  }

  getCadastro(id: string){
    return this.cadastroCollection.doc<CadastroFuncionario>(id).valueChanges();
  }

  updateCadastro(id: string, cadastro: CadastroFuncionario){
    return this.cadastroCollection.doc<CadastroFuncionario>(id).update(cadastro);
  }

  deleteCadastro(id: string){
    return this.cadastroCollection.doc(id).delete();
  }
}
