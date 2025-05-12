import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  Users,
  ActivitySquare,
  LineChart,
  BarChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12,345,000</div>
            <p className="text-xs text-slate-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pesanan Baru</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24</div>
            <p className="text-xs text-slate-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+8%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
            <ActivitySquare className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-slate-500 flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500 font-medium">-4%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengunjung</CardTitle>
            <LineChart className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-slate-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+16%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Pendapatan Bulanan</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] md:h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <BarChart className="h-8 w-8 text-slate-300" />
                  <span className="ml-2 text-slate-500 text-sm">Chart Pendapatan</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pesanan Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Website E-commerce", "Aplikasi Mobile", "Skripsi Manajemen", "Sempro Teknik"].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{item}</p>
                        <p className="text-xs text-slate-500">
                          {["Completed", "In Progress", "Pending", "New"][i]}
                        </p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        ["bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-slate-500"][i]
                      }`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">Detail analytics akan ditampilkan di sini.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">Laporan akan ditampilkan di sini.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}