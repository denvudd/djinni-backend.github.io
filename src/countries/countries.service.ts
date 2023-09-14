import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesService {
  findPopularCities() {
    return [
      {
        city: 'Kyiv',

        admin_name: 'Kyiv, Misto',
      },
      {
        city: 'Kharkiv',

        admin_name: 'Kharkivska Oblast',
      },
      {
        city: 'Odesa',

        admin_name: 'Odeska Oblast',
      },
      {
        city: 'Dnipro',

        admin_name: 'Dnipropetrovska Oblast',
      },
      {
        city: 'Donetsk',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Zaporizhzhia',

        admin_name: 'Zaporizka Oblast',
      },
      {
        city: 'Lviv',

        admin_name: 'Lvivska Oblast',
      },
      {
        city: 'Kryvyi Rih',

        admin_name: 'Dnipropetrovska Oblast',
      },
      {
        city: 'Sevastopol',

        admin_name: 'Sevastopol, Misto',
      },
      {
        city: 'Mykolaiv',

        admin_name: 'Mykolaivska Oblast',
      },
      {
        city: 'Mariupol',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Luhansk',

        admin_name: 'Luhanska Oblast',
      },
      {
        city: 'Vinnytsia',

        admin_name: 'Vinnytska Oblast',
      },
      {
        city: 'Makiivka',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Simferopol',

        admin_name: 'Krym, Avtonomna Respublika',
      },
      {
        city: 'Poltava',

        admin_name: 'Poltavska Oblast',
      },
    ];
  }

  findUkrainianCities() {
    return [
      {
        city: 'Kyiv',

        admin_name: 'Kyiv, Misto',
      },
      {
        city: 'Kharkiv',

        admin_name: 'Kharkivska Oblast',
      },
      {
        city: 'Odesa',

        admin_name: 'Odeska Oblast',
      },
      {
        city: 'Dnipro',

        admin_name: 'Dnipropetrovska Oblast',
      },
      {
        city: 'Donetsk',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Zaporizhzhia',

        admin_name: 'Zaporizka Oblast',
      },
      {
        city: 'Lviv',

        admin_name: 'Lvivska Oblast',
      },
      {
        city: 'Kryvyi Rih',

        admin_name: 'Dnipropetrovska Oblast',
      },
      {
        city: 'Sevastopol',

        admin_name: 'Sevastopol, Misto',
      },
      {
        city: 'Mykolaiv',

        admin_name: 'Mykolaivska Oblast',
      },
      {
        city: 'Mariupol',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Luhansk',

        admin_name: 'Luhanska Oblast',
      },
      {
        city: 'Vinnytsia',

        admin_name: 'Vinnytska Oblast',
      },
      {
        city: 'Makiivka',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Simferopol',

        admin_name: 'Krym, Avtonomna Respublika',
      },
      {
        city: 'Poltava',

        admin_name: 'Poltavska Oblast',
      },
      {
        city: 'Chernihiv',

        admin_name: 'Chernihivska Oblast',
      },
      {
        city: 'Kherson',

        admin_name: 'Khersonska Oblast',
      },
      {
        city: 'Cherkasy',

        admin_name: 'Cherkaska Oblast',
      },
      {
        city: 'Khmelnytskyi',

        admin_name: 'Khmelnytska Oblast',
      },
      {
        city: 'Chernivtsi',

        admin_name: 'Chernivetska Oblast',
      },
      {
        city: 'Sumy',

        admin_name: 'Sumska Oblast',
      },
      {
        city: 'Zhytomyr',

        admin_name: 'Zhytomyrska Oblast',
      },
      {
        city: 'Horlivka',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Rivne',

        admin_name: 'Rivnenska Oblast',
      },
      {
        city: 'Ivano-Frankivsk',

        admin_name: 'Ivano-Frankivska Oblast',
      },
      {
        city: 'Kamianske',

        admin_name: 'Dnipropetrovska Oblast',
      },
      {
        city: 'Kropyvnytskyi',

        admin_name: 'Kirovohradska Oblast',
      },
      {
        city: 'Ternopil',

        admin_name: 'Ternopilska Oblast',
      },
      {
        city: 'Kremenchuk',

        admin_name: 'Poltavska Oblast',
      },
      {
        city: 'Lutsk',

        admin_name: 'Volynska Oblast',
      },
      {
        city: 'Bila Tserkva',

        admin_name: 'Kyivska Oblast',
      },
      {
        city: 'Kramatorsk',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Melitopol',

        admin_name: 'Zaporizka Oblast',
      },
      {
        city: 'Sievierodonetsk',

        admin_name: 'Luhanska Oblast',
      },
      {
        city: 'Kerch',

        admin_name: 'Krym, Avtonomna Respublika',
      },
      {
        city: 'Drohobych',

        admin_name: 'Lvivska Oblast',
      },
      {
        city: 'Khrustalnyi',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Uzhhorod',

        admin_name: 'Zakarpatska Oblast',
      },
      {
        city: 'Berdiansk',

        admin_name: 'Zaporizka Oblast',
      },
      {
        city: 'Sloviansk',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Nikopol',

        admin_name: 'Dnipropetrovska Oblast',
      },
      {
        city: 'Brovary',

        admin_name: 'Kyivska Oblast',
      },
      {
        city: 'Yevpatoriia',

        admin_name: 'Krym, Avtonomna Respublika',
      },
      {
        city: 'Pavlohrad',

        admin_name: 'Dnipropetrovska Oblast',
      },
      {
        city: 'Alchevsk',

        admin_name: 'Luhanska Oblast',
      },
      {
        city: 'Konotop',

        admin_name: 'Sumska Oblast',
      },
      {
        city: 'Kamianets-Podilskyi',

        admin_name: 'Khmelnytska Oblast',
      },
      {
        city: 'Lysychansk',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Dovzhansk',

        admin_name: 'Luhanska Oblast',
      },
      {
        city: 'Mukacheve',

        admin_name: 'Zakarpatska Oblast',
      },
      {
        city: 'Uman',

        admin_name: 'Cherkaska Oblast',
      },
      {
        city: 'Chervonohrad',

        admin_name: 'Lvivska Oblast',
      },
      {
        city: 'Yalta',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Yenakiieve',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Bakhmut',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Stakhanov',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Nizhyn',

        admin_name: 'Chernihivska Oblast',
      },
      {
        city: 'Kostiantynivka',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Fedosiia',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Kovel',

        admin_name: 'Volynska Oblast',
      },
      {
        city: 'Smila',

        admin_name: 'Cherkaska Oblast',
      },
      {
        city: 'Korosten',

        admin_name: 'Zhytomyrska Oblast',
      },
      {
        city: 'Pokrovsk',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Pervomaisk',

        admin_name: 'Mykolaivska Oblast',
      },
      {
        city: 'Kolomyia',

        admin_name: 'Ivano-Frankivska Oblast',
      },
      {
        city: 'Rubizhne',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Chornomorsk',

        admin_name: 'Odeska Oblast',
        capital: '',
      },
      {
        city: 'Khartsyzk',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Druzhkivka',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Stryi',

        admin_name: 'Lvivska Oblast',
      },
      {
        city: 'Bilhorod-Dnistrovskyi',

        admin_name: 'Odeska Oblast',
      },
      {
        city: 'Irpin',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Novohrad-Volynskyi',

        admin_name: 'Zhytomyrska Oblast',
      },
      {
        city: 'Lozova',

        admin_name: 'Kharkivska Oblast',
      },
      {
        city: 'Antratsyt',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Chystiakove',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Horishni Plavni',

        admin_name: 'Poltavska Oblast',
        capital: '',
      },
      {
        city: 'Myrnohrad',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Shakhtarsk',

        admin_name: 'Donetska Oblast',
      },
      {
        city: 'Okhtyrka',

        admin_name: 'Sumska Oblast',
      },
      {
        city: 'Brianka',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Snizhne',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Rovenky',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Fastiv',

        admin_name: 'Kyivska Oblast',
      },
      {
        city: 'Lubny',

        admin_name: 'Poltavska Oblast',
      },
      {
        city: 'Krasnodon',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Shepetivka',

        admin_name: 'Khmelnytska Oblast',
      },
      {
        city: 'Romny',

        admin_name: 'Sumska Oblast',
      },
      {
        city: 'Myrhorod',

        admin_name: 'Poltavska Oblast',
      },
      {
        city: 'Podilsk',

        admin_name: 'Odeska Oblast',
      },
      {
        city: 'Vyshneve',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Vasylkiv',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Dubno',

        admin_name: 'Rivnenska Oblast',
      },
      {
        city: 'Boryslav',

        admin_name: 'Lvivska Oblast',
        capital: '',
      },
      {
        city: 'Holubivske',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Boyarka',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Yasynuvata',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Bucha',

        admin_name: 'Kyivska Oblast',
      },
      {
        city: 'Avdiivka',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Sambir',

        admin_name: 'Lvivska Oblast',
      },
      {
        city: 'Toretsk',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Zhmerynka',

        admin_name: 'Vinnytska Oblast',
      },
      {
        city: 'Chuhuiv',

        admin_name: 'Kharkivska Oblast',
      },
      {
        city: 'Mohyliv-Podilskyi',

        admin_name: 'Vinnytska Oblast',
      },
      {
        city: 'Truskavets',

        admin_name: 'Lvivska Oblast',
        capital: '',
      },
      {
        city: 'Khmilnyk',

        admin_name: 'Vinnytska Oblast',
      },
      {
        city: 'Kupiansk',

        admin_name: 'Kharkivska Oblast',
      },
      {
        city: 'Pereyaslav-Khmel’nyts’kyy',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Sofiyivs’ka Borshchahivka',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Perevalsk',

        admin_name: 'Luhanska Oblast',
      },
      {
        city: 'Vynohradiv',

        admin_name: 'Zakarpatska Oblast',
      },
      {
        city: 'Saky',

        admin_name: 'Krym, Avtonomna Respublika',
      },
      {
        city: 'Selydove',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Pesochin',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Molodohvardiisk',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Merefa',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Bilohorodka',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Sukhodilsk',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Liubotyn',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Kotsyubyns’ke',

        admin_name: 'Kyiv, Misto',
        capital: '',
      },
      {
        city: 'Hostomel',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Taromske',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Vynnyky',

        admin_name: 'Lvivska Oblast',
        capital: '',
      },
      {
        city: 'Chervonopartyzansk',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Nyzhnia Krynka',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Petrovske',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Antonivka',

        admin_name: 'Khersonska Oblast',
        capital: '',
      },
      {
        city: 'Zhdanivka',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Vakhrusheve',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Hirnyk',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Sartana',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Haspra',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Novgorodskoye',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Inkerman',

        admin_name: 'Sevastopol, Misto',
        capital: '',
      },
      {
        city: 'Korolevo',

        admin_name: 'Zakarpatska Oblast',
        capital: '',
      },
      {
        city: 'Sniatyn',

        admin_name: 'Ivano-Frankivska Oblast',
      },
      {
        city: 'Sofiivka',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Bezliudivka',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Bilenke',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Hurzuf',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Horodenka',

        admin_name: 'Ivano-Frankivska Oblast',
      },
      {
        city: 'Masandra',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Yasnohirka',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Pochaiv',

        admin_name: 'Ternopilska Oblast',
        capital: '',
      },
      {
        city: 'Vuhlehirsk',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Zorynsk',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Komyshany',

        admin_name: 'Khersonska Oblast',
        capital: '',
      },
      {
        city: 'Piskivka',

        admin_name: 'Kyivska Oblast',
      },
      {
        city: 'Karnaukhivka',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Rozkishne',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Vorzel',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Halych',

        admin_name: 'Ivano-Frankivska Oblast',
      },
      {
        city: 'Petropavlivs’ka Borshchahivka',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Balabyne',

        admin_name: 'Zaporizka Oblast',
        capital: '',
      },
      {
        city: 'Zelenivka',

        admin_name: 'Khersonska Oblast',
        capital: '',
      },
      {
        city: 'Chornukhyne',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Koreiz',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Bryukhovychi',

        admin_name: 'Lvivska Oblast',
        capital: '',
      },
      {
        city: 'Horenka',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Zalizne',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Khotiv',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Chabany',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Novooleksandrivka',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Almazna',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Shabelkivka',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Obroshino',

        admin_name: 'Lvivska Oblast',
        capital: '',
      },
      {
        city: 'Novopillia',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Simeiz',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Novosilky',

        admin_name: 'Kyiv, Misto',
        capital: '',
      },
      {
        city: 'Duliby',

        admin_name: 'Lvivska Oblast',
        capital: '',
      },
      {
        city: 'Kryukivshchyna',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Rohan',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Mykhaylivka-Rubezhivka',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Valianivske',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Malokaterynivka',

        admin_name: 'Zaporizka Oblast',
        capital: '',
      },
      {
        city: 'Vylok',

        admin_name: 'Zakarpatska Oblast',
        capital: '',
      },
      {
        city: 'Kulynychi',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Sadky',

        admin_name: 'Poltavska Oblast',
        capital: '',
      },
      {
        city: 'Pervomaiskyi',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Brytivka',

        admin_name: 'Odeska Oblast',
        capital: '',
      },
      {
        city: 'Blyzhnie',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Lyubymivka',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Mala Rohan',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Kaihador',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Nikita',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Tereshky',

        admin_name: 'Poltavska Oblast',
        capital: '',
      },
      {
        city: 'Zarichany',

        admin_name: 'Zhytomyrska Oblast',
        capital: '',
      },
      {
        city: 'Aviatorske',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Mykhailivka',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Verkhnosadove',

        admin_name: 'Sevastopol, Misto',
        capital: '',
      },
      {
        city: 'Aeroflotskyi',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Chornotysiv',

        admin_name: 'Zakarpatska Oblast',
        capital: '',
      },
      {
        city: 'Borki',

        admin_name: 'Lvivska Oblast',
        capital: '',
      },
      {
        city: 'Piilo',

        admin_name: 'Ivano-Frankivska Oblast',
        capital: '',
      },
      {
        city: 'Yablunytsia',

        admin_name: 'Ivano-Frankivska Oblast',
        capital: '',
      },
      {
        city: 'Dobrovlyany',

        admin_name: 'Ternopilska Oblast',
        capital: '',
      },
      {
        city: 'Bilshivtsi',

        admin_name: 'Ivano-Frankivska Oblast',
        capital: '',
      },
      {
        city: 'Ruski Tyshky',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Shcherbani',

        admin_name: 'Poltavska Oblast',
        capital: '',
      },
      {
        city: 'Stari Kodaky',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Berezivka',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Nasypne',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Lisnyky',

        admin_name: 'Kyivska Oblast',
        capital: '',
      },
      {
        city: 'Andriivka',

        admin_name: 'Sevastopol, Misto',
        capital: '',
      },
      {
        city: 'Iverske',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Chukaluvka',

        admin_name: 'Ivano-Frankivska Oblast',
        capital: '',
      },
      {
        city: 'Pokrovske',

        admin_name: 'Donetska Oblast',
        capital: '',
      },
      {
        city: 'Solomonovo',

        admin_name: 'Zakarpatska Oblast',
        capital: '',
      },
      {
        city: 'Lavky',

        admin_name: 'Zakarpatska Oblast',
        capital: '',
      },
      {
        city: 'Slobozhanske',

        admin_name: 'Kharkivska Oblast',
        capital: '',
      },
      {
        city: 'Shevchenkivske',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Krasnokamianka',

        admin_name: 'Krym, Avtonomna Respublika',
        capital: '',
      },
      {
        city: 'Bairachky',

        admin_name: 'Luhanska Oblast',
        capital: '',
      },
      {
        city: 'Marianivka',

        admin_name: 'Dnipropetrovska Oblast',
        capital: '',
      },
      {
        city: 'Volodymyr-Volynskyi',

        admin_name: 'Volynska Oblast',

        population: '',
        population_proper: '',
      },
    ];
  }
}
