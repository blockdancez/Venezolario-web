#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Venezolario 游戏数据转换脚本
将游戏关卡数据转换为Excel表格格式
"""

import pandas as pd
import json

# 游戏数据
game_data = [
    {"id": 1, "word1": "Blanco", "word2": "Rubio", "word3": "Ojos claros", "answer": "catire"},
    {"id": 2, "word1": "Zumo", "word2": "Bebida líquida", "word3": "Frutal", "answer": "Jugo"},
    {"id": 3, "word1": "Joven", "word2": "Muchacho", "word3": "Amigo", "answer": "Chamo"},
    {"id": 4, "word1": "Banana", "word2": "Guineo", "word3": "Plátano", "answer": "Cambur"},
    {"id": 5, "word1": "Delincuente", "word2": "Criminal", "word3": "Malhechor", "answer": "Malandro"},
    {"id": 6, "word1": "Sandía", "word2": "Melón de agua", "word3": "Acendría", "answer": "Patilla"},
    {"id": 7, "word1": "Planta", "word2": "Vegetación", "word3": "Arbusto", "answer": "MATA"},
    {"id": 8, "word1": "Estadounidense", "word2": "Extranjero Habla", "word3": "inglés", "answer": "gringo"},
    {"id": 9, "word1": "Regalo al comprador", "word2": "Extra gratis", "word3": "Adicional", "answer": "Ñapa"},
    {"id": 10, "word1": "Novia", "word2": "Atractiva", "word3": "Jovencita", "answer": "jeva"},
    {"id": 11, "word1": "Palomitas de maíz", "word2": "Crispetas", "word3": "Gallitos", "answer": "COTUFAS"},
    {"id": 12, "word1": "Desafortunado", "word2": "Sin suerte", "word3": "Desgracia constante", "answer": "Salado"},
    {"id": 13, "word1": "Mentira", "word2": "Exageración", "word3": "Falsedad", "answer": "Coba"},
    {"id": 14, "word1": "De mal sabor", "word2": "Desagradable", "word3": "Que no está bueno", "answer": "Maluco"},
    {"id": 15, "word1": "Plato navideño", "word2": "Envuelta en hojas", "word3": "Masa rellena", "answer": "Hallaca"},
    {"id": 16, "word1": "Andino", "word2": "Con acento", "word3": "Amable", "answer": "Gocho"},
    {"id": 17, "word1": "Fiesta intensa", "word2": "Celebración", "word3": "Festejo", "answer": "Rumba"},
    {"id": 18, "word1": "Dibujos animados", "word2": "Caricatura", "word3": "Infantil", "answer": "Comiquitas"},
    {"id": 19, "word1": "Buenísimo", "word2": "Estupendo", "word3": "Genial", "answer": "Chevere"},
    {"id": 20, "word1": "Tacaño", "word2": "No comparte", "word3": "No gasta", "answer": "Pichirre"},
    {"id": 21, "word1": "Lasaña", "word2": "Pasta", "word3": "Horno", "answer": "Pasticho"},
    {"id": 22, "word1": "Cosas del hogar", "word2": "Platos", "word3": "Utensilios", "answer": "Corotos"},
    {"id": 23, "word1": "Bebida frutal", "word2": "Frutas picadas", "word3": "Jugosa y colorida", "answer": "Tizana"},
    {"id": 24, "word1": "Fastidio", "word2": "Molesto", "word3": "Irritante", "answer": "Ladilla"},
    {"id": 25, "word1": "Lluvia fuerte", "word2": "Aguacero", "word3": "Chaparrón", "answer": "Palo de agua"},
    {"id": 26, "word1": "Podrido", "word2": "Hediondo", "word3": "En mal estado", "answer": "Piche"},
    {"id": 27, "word1": "Mujer posesiva", "word2": "Celosa", "word3": "Controladora", "answer": "Cuaima"},
    {"id": 28, "word1": "Infusión", "word2": "Té", "word3": "Remedio criollo", "answer": "Guarapo"},
    {"id": 29, "word1": "Malvado", "word2": "Traicionero", "word3": "Injusto", "answer": "Rata"},
    {"id": 30, "word1": "Panza cocida", "word2": "Callos", "word3": "Sopa espesa", "answer": "Mondongo"},
    {"id": 31, "word1": "Maracuyá", "word2": "Fruta de la pasión", "word3": "Ácida", "answer": "Parchita"},
    {"id": 32, "word1": "Hurgar", "word2": "Curiosear", "word3": "Escarbar", "answer": "Jurungar"},
    {"id": 33, "word1": "Suertudo", "word2": "Afortunado", "word3": "Favorecido", "answer": "Sortario"},
    {"id": 34, "word1": "Copia", "word2": "Ilegal", "word3": "Mala calidad", "answer": "Pirata"},
    {"id": 35, "word1": "Plato típico", "word2": "Arroz y caraotas", "word3": "Carne mechada", "answer": "Pabellon"},
    {"id": 36, "word1": "Clase acomodada", "word2": "Ropita de marca", "word3": "Presumido", "answer": "Sifrino"},
    {"id": 37, "word1": "Muy entusiasta", "word2": "Intenso", "word3": "Obsesivo", "answer": "Fiebruo"},
    {"id": 38, "word1": "Retrete", "word2": "Inodoro", "word3": "Baño", "answer": "Poceta"},
    {"id": 39, "word1": "Burlarse", "word2": "Mofarse", "word3": "Reírse de alguien", "answer": "chalequear"},
    {"id": 40, "word1": "Adelantar en la fila", "word2": "Pasar sin permiso", "word3": "Hacer trampa", "answer": "Colear"},
    {"id": 41, "word1": "Relajo", "word2": "Desorden", "word3": "Poca seriedad", "answer": "Guachafita"},
    {"id": 42, "word1": "Infidelidad", "word2": "Cuernos", "word3": "Adulterio", "answer": "Cacho"},
    {"id": 43, "word1": "Semilla", "word2": "Hueso", "word3": "Almendra", "answer": "Pepa"},
    {"id": 44, "word1": "Partido informal", "word2": "Juego improvisado", "word3": "Encuentro amistoso", "answer": "Caimanera"},
    {"id": 45, "word1": "Poco elegante", "word2": "Sin estilo", "word3": "De mal gusto", "answer": "Niche"},
    {"id": 46, "word1": "Aglomeración", "word2": "Multitud", "word3": "Muchedumbre", "answer": "Bululu"},
    {"id": 47, "word1": "Siesta", "word2": "Sueño breve", "word3": "Descanso", "answer": "Camaron"},
    {"id": 48, "word1": "Desorden", "word2": "Revuelo", "word3": "Alboroto", "answer": "Zaperoco"},
    {"id": 49, "word1": "Anteojos", "word2": "Gafas", "word3": "Para ver bien", "answer": "Lentes"}
]

def create_excel_file():
    """创建Excel文件"""
    # 创建DataFrame
    df = pd.DataFrame(game_data)
    
    # 确保列的顺序
    df = df[['id', 'word1', 'word2', 'word3', 'answer']]
    
    # 保存为Excel文件
    output_file = 'venezolario_chapter1_data.xlsx'
    df.to_excel(output_file, index=False, engine='openpyxl')
    
    print(f"✅ 已成功创建Excel文件: {output_file}")
    print(f"📊 共包含 {len(game_data)} 个关卡数据")
    
    # 显示前5行数据作为预览
    print("\n🔍 数据预览:")
    print(df.head())
    
    return output_file

def create_json_backup():
    """创建JSON备份文件"""
    output_file = 'venezolario_chapter1_data.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(game_data, f, ensure_ascii=False, indent=2)
    
    print(f"📄 已创建JSON备份文件: {output_file}")
    return output_file

if __name__ == "__main__":
    print("🎮 Venezolario 数据转换工具")
    print("=" * 50)
    
    try:
        # 创建Excel文件
        excel_file = create_excel_file()
        
        # 创建JSON备份
        json_file = create_json_backup()
        
        print("\n✨ 转换完成!")
        print(f"Excel文件: {excel_file}")
        print(f"JSON备份: {json_file}")
        
    except Exception as e:
        print(f"❌ 转换过程中出现错误: {e}")
        print("请确保安装了pandas和openpyxl库:")
        print("pip install pandas openpyxl") 