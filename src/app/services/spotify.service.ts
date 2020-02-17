import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  // forma automatica de importar servicios
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log("Servicio de spotify listo")
  }

  getQuery( query:string ) {
    
    const url = `https://api.spotify.com/v1/${ query }`;

    // headers
    // especifico todos los headers
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAnpzf0XBHrjY8NQMJ8CVZO4F4fp1SYQpOJxfRkEY2E7lhdSSHZ5_jfqzCi6rAputvD_Zjavz6cCQC2_AU'
    });

    return this.http.get( url, { headers } );

  }

  // servicio de canciones *home*
  getNewReleases() {

    // getQuery va a ser el argumento que realiza la peticion y regresa el observable

    // hacer peticion http.get
    return this.getQuery('browse/new-releases')
              .pipe( map( data => data['albums'].items ));

  }
  
  // servicio de *search*
  getArtistas( termino: string ) {
  
    // hacer peticion http.get
    return this.getQuery(`search?query=${ termino }&type=artist&offset=0&limit=15`)
                .pipe( map( data => data['artists'].items ));

  }
  
  // al hacer click en un artista
  getArtista( id: string ) {
  
    // hacer peticion http.get
    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items ));

  }
  
  // obtener los mayores exitos
  getTopTracks( id: string ) {
  
    // hacer peticion http.get
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks'] ));
  }

}
