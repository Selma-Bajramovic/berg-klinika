
# Berg Klinika

## Pregled

Berg Klinika je sveobuhvatno softversko rješenje dizajnirano za optimizaciju poslovanja manjih klinika. Aplikacija omogućava efikasnu registraciju pacijenata, upravljanje doktorima i vođenje evidencije o prijemima i nalazima pacijenata. Cilj je osigurati funkcionalan i jednostavan korisnički interfejs uz sigurno i pouzdano backend rješenje.

## Funkcionalnosti

1. **Evidencija prijema pacijenata**:
   - Pregled svih zakazanih prijema pacijenata sa detaljima poput imena pacijenta, datuma/vremena, statusa hitnosti i nadležnog doktora.
   - Filtriranje prijema po datumu ili hitnosti.
   - Dodavanje novih prijema sa validacijama za buduće datume.

2. **Upravljanje doktorima**:
   - Upravljanje doktorima, uključujući dodavanje, uređivanje i brisanje podataka.
   - Filtriranje doktora po specijalizaciji.

3. **Upravljanje pacijentima**:
   - Upravljanje pacijentima kroz dodavanje, uređivanje i brisanje podataka.
   - Prikaz svih registrovanih pacijenata sa ključnim informacijama.

4. **Evidencija nalaza**:
   - Pisanje, uređivanje i brisanje nalaza povezanih s određenim prijemima pacijenata.
   - Upravljanje nalazima uz validacije kako bi se spriječili duplikati.

5. **Ažuriranje podataka u realnom vremenu**:
   - Liste i filteri se automatski ažuriraju prilikom dodavanja, uređivanja ili brisanja podataka.

6. **Validacije**:
   - Osiguranje ispravnog unosa podataka za polja poput JMBG-a, broja telefona i datuma rođenja.
   - Sprječavanje logičkih grešaka poput nevalidnih raspona datuma.

## Tehnologije

### Preduvjeti

Za pokretanje projekta potrebne su sljedeće verzije:

- **Node.js**: v20.18.1 ili novija
- **Angular CLI**: v19.0.2
- **SQL Server Management Studio**: v20.0
- **Visual Studio**: .NET 8.0 SDK

### Struktura

- **Backend**: Smješten u direktoriju `API/`, razvijen u .NET 8.0 za API funkcionalnosti.
- **Frontend**: Smješten u direktoriju `WEB/`, implementiran u Angularu za korisnički interfejs.
- **Baza podataka**: Upravljanje putem SQL Server Management Studio.

## Upute za korištenje

1. Klonirajte repozitorij i otvorite direktorij projekta.
2. Instalirajte zavisnosti:
   - Pokrenite `npm install` za frontend.
   - Vratite .NET zavisnosti za backend.
3. Konfigurišite SQL Server bazu podataka i ažurirajte connection string u backendu.
4. Pokrenite backend:
   ```bash
   dotnet run --project API/
   ```
5. Pokrenite frontend:
   ```bash
   ng serve --open
   ```

## Ključni ekrani i funkcionalnosti

1. **Upravljanje prijemima**:
   - `/prijemi`: Pregled, filtriranje i upravljanje prijemima pacijenata.
   - Dugme "Dodaj novi prijem" vodi na formu za unos novog prijema.
   - Opcija "Samo hitni prijemi" za fokusiranje na hitne slučajeve.

2. **Upravljanje doktorima**:
   - `/doktori`: Pregled i upravljanje podacima o doktorima.
   - Filtriranje po specijalizaciji.
   - Dodavanje, uređivanje i brisanje doktora.

3. **Upravljanje pacijentima**:
   - `/pacijenti`: Pregled i upravljanje podacima o pacijentima.
   - Dodavanje, uređivanje i brisanje podataka o pacijentima.

4. **Upravljanje nalazima**:
   - `/nalazi`: Pisanje, pregled, uređivanje i brisanje nalaza vezanih za prijeme pacijenata.

## Planovi za unapređenje

- Validacije za unos podataka poput JMBG-a, brojeva telefona i datuma rođenja.
- Ograničenje unosa na jedan nalaz po prijemu.
- Modernizacija korisničkog interfejsa za bolje korisničko iskustvo.
- Priprema za deployment aplikacije u produkciju.
- Filtriranje po nadležnom doktoru i implementacija login sistema za ograničavanje pristupa.
- Implementacija paginacije za lakše upravljanje velikim brojem prijema.
- Pretraga po ključnim riječima u nalazima i prijemima.

## Dokazi funkcionalnosti

https://youtu.be/JW-t5LsXIDw