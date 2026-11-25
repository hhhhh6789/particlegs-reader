const glossary = {
  "ODE 积分器": "根据状态的变化规律，从起始状态算出指定时刻状态的工具。",
  "等距时间点": "相邻两个时间点之间的间隔相同。",
  "一维张量": "一串按顺序存放的数值。每个元素可以通过一个索引取出。",
  "球谐系数": "描述高斯颜色如何随观察方向变化的一组数值。",
  "球谐颜色系数": "描述高斯颜色如何随观察方向变化的一组数值。",
  "光栅化": "把场景投影到图像上，计算每个像素的值。",
};

const tensorMethods = {
  detach: "PyTorch 张量的方法，返回数值相同、已断开梯度跟踪的张量。",
  cpu: "PyTorch 张量的方法，返回位于 CPU 上的张量。",
  item: "从只有一个元素的张量或数组中取出 Python 数值。",
  unsqueeze: "PyTorch 张量的方法，在指定位置插入长度为 1 的维度。",
  squeeze: "PyTorch 张量的方法，移除长度为 1 的维度。",
  contiguous: "PyTorch 张量的方法，返回连续存储的同形状张量。",
  numpy: "PyTorch 张量的方法，把 CPU 张量转换为 NumPy 数组。",
};

const gaussianModelName = "基础高斯模型，保存各高斯的中心、尺度、旋转、颜色和不透明度。";

const knownNames = {
  detach: tensorMethods.detach,
  torch: "PyTorch 模块，提供张量和神经网络运算。",
  nn: "PyTorch 的神经网络模块，提供网络层和模型容器。",
  np: "NumPy 的常用别名，用于处理数组。",
  self: "当前对象。通过它访问这个对象的属性和方法。",
  __init__: "创建对象时，Python 自动调用的初始化方法。",
  "nn.Sequential": "按给定顺序串起网络层，前一层的输出交给后一层。",
  "nn.ModuleList": "保存并注册一组子模块，调用者决定怎样遍历和使用这些模块。",
  "nn.Linear": "用可学习的权重和偏置，把特征的最后一维映射到指定长度。",
  "nn.GELU": "对每个值做非线性变换，保留输入形状。",
  "nn.Module": "PyTorch 模型和网络层的基类，用来组织可训练参数和子模块。",
  "torch.Tensor": "PyTorch 的张量类型，表示可在 CPU 或 GPU 上运算的多维数值数据。",
  "torch.autograd.Function": "PyTorch 自定义求导的基类，子类通过 forward 和 backward 指定前向和反向计算。",
  os: "Python 标准库模块，提供文件、目录和操作系统相关功能。",
  random: "Python 标准库模块，提供生成随机数、随机抽取元素和打乱顺序等功能。",
  "random.randint": "random 模块中的函数，从指定的下限到上限等概率抽取一个整数，包含两端。",
  "random.shuffle": "random 模块中的函数，直接打乱传入列表中各项的顺序。",
  "random.seed": "random 模块中的函数，设置随机数生成的起点。用同一个种子可以复现后续的抽样顺序。",
  "os.path": "Python 标准库中的路径处理模块。",
  "os.path.join": "把路径的各部分拼成一个路径。",
  "os.makedirs": "按路径创建目录。缺少上级目录时，也会一起创建。",
  object: "Python 对象的公共基类。类可以从它继承默认的对象行为。",
  property: "把类的方法声明为属性，访问属性时由这个方法计算并返回值。",
  staticmethod: "把方法声明为静态方法，调用时 Python 不会自动传入对象或类。",
  Exception: "常见 Python 异常的基类。捕获它可以处理大多数执行错误。",
  TypeError: "参数类型或调用方式不符合要求时发生的异常。",
  ValueError: "值的类型符合要求，但内容或取值不合法时发生的异常。",
  ImportError: "模块或模块中的成员无法导入时发生的异常。",
  RuntimeError: "运行过程中遇到无法继续的错误时抛出的异常。",
  OSError: "文件、目录等操作系统操作失败时抛出的异常。",
  "getattr": "按名字读取对象属性。传了默认值时，缺少这个属性就返回默认值。",
  "float32": "用 32 位存储的浮点数类型。",
  "self._features_rest": "每个高斯的其余球谐颜色系数，用于表示颜色随观察方向的变化。",
  "self._features_dc": "每个高斯的零阶球谐颜色系数，表示与观察方向无关的颜色分量。",
};

const moduleNames = {
  diff_gaussian_rasterization: "可微高斯光栅化的 Python 包，把高斯数据交给 CUDA 扩展并接回渲染结果。",
  importlib: "Python 标准库包，提供导入和加载模块的工具。",
  pytorch3d: "用于三维深度学习的 Python 库，项目用它做点云取样和近邻计算。",
  simple_knn: "点云近邻计算扩展包，项目用它估计高斯的初始尺度。",
  "simple_knn._C": "Simple-KNN 编译出的 CUDA 扩展，提供点云近邻距离计算。",
  "torch.utils": "PyTorch 的辅助工具包，包含数据加载、日志记录和扩展构建等模块。",
  "torch.utils.data": "PyTorch 的数据工具模块，用于定义数据集和组织数据加载。",
  "torch.utils.tensorboard": "PyTorch 的日志模块，将训练指标、图像等写成 TensorBoard 可以读取的日志。",
  "torchvision.transforms": "TorchVision 的变换模块，用于预处理图像或张量。",
  utils: "ParticleGS 的工具模块目录，组织相机、坐标变换、损失和文件操作等辅助代码。",
  argparse: "Python 标准库模块，定义并读取命令行参数。",
  collections: "Python 标准库模块，提供字典、队列和具名元组等容器工具。",
  concurrent: "Python 标准库包，组织并发执行工具，项目从其中的 futures 提交并行任务。",
  "concurrent.futures": "Python 标准库模块，提交并行任务并取得运行结果。",
  datetime: "Python 标准库模块，用来表示和处理日期及时间。",
  errno: "Python 标准库模块，提供文件已存在等系统错误的编号。",
  glob: "Python 标准库模块，按通配符查找符合模式的文件路径。",
  hashlib: "Python 标准库模块，为字节内容计算哈希值。",
  "importlib.util": "Python 标准库模块，提供查找、加载和初始化模块的工具。",
  json: "Python 标准库模块，在 Python 数据和 JSON 文本之间转换。",
  math: "Python 标准库模块，提供标量数学运算及常量。",
  pathlib: "Python 标准库模块，将文件路径表示为可拼接、可查询的对象。",
  re: "Python 标准库模块，用正则表达式匹配、提取或替换文本。",
  shutil: "Python 标准库模块，提供复制、移动文件和目录等操作。",
  struct: "Python 标准库模块，按指定字节顺序和类型读写二进制数据。",
  sys: "Python 标准库模块，访问解释器的参数、模块路径和标准输入输出。",
  tarfile: "Python 标准库模块，读取或写入 TAR 归档。",
  time: "Python 标准库模块，读取时间及测量运行耗时。",
  typing: "Python 标准库模块，为参数、返回值和变量声明类型。",
  uuid: "Python 标准库模块，用来生成通用唯一标识符。",
  cv2: "OpenCV 的 Python 模块，提供图像读取、缩放和颜色转换等工具。",
  imageio: "用于读写图像和视频的 Python 库。",
  lpips: "计算图像感知距离的库，这里用于比较渲染图与真实图。",
  numpy: "处理多维数组和数值计算的 Python 库。",
  PIL: "Pillow 的 Python 包，提供图像读取、转换和处理工具。",
  "PIL.Image": "Pillow 的图像模块，用来创建、读取和转换图片。",
  plyfile: "读写 PLY 格式点云及其属性的 Python 库。",
  "pytorch3d.ops": "PyTorch3D 的三维运算模块，项目用它做点云近邻查询和采样。",
  setuptools: "Python 打包工具，扩展模块的 setup.py 用它声明构建方式。",
  "torch.autograd": "PyTorch 的自动求导模块，用于记录运算和计算梯度。",
  "torch.nn": "PyTorch 的神经网络模块，提供网络层和模型容器。",
  "torch.nn.functional": "PyTorch 的函数式接口，提供卷积、激活和归一化等运算。",
  "torch.utils.cpp_extension": "PyTorch 的扩展构建模块，用来编译连接 C++ 或 CUDA 实现。",
  torchdiffeq: "用于在 PyTorch 中求解常微分方程的库。",
  torchvision: "PyTorch 的视觉工具库，提供图像转换、预训练模型和相关工具。",
  "torchvision.transforms.functional": "图像变换函数模块，用来缩放、转换及处理图像或张量。",
  tqdm: "在循环执行时显示进度条的 Python 库。",
};

const importedMembers = {
  "scene.dataset_readers.sceneLoadTypeCallbacks": "数据格式到读取函数的映射，用来选择相应的场景读取器。",
  "datetime.datetime": "表示日期和时刻的类，项目用它给控制台日志附上当前时间。",
  "diff_gaussian_rasterization.GaussianRasterizationSettings": "光栅化设置类型，保存图像尺寸、相机矩阵和背景等渲染输入。",
  "diff_gaussian_rasterization.GaussianRasterizer": "可微高斯光栅化器，把三维高斯渲染为图像和深度。",
  "diff_gaussian_rasterization._C": "光栅化的原生扩展，为 Python 封装提供 CUDA 渲染和反向计算。",
  "torch.autograd.Variable": "PyTorch 的旧版自动求导接口，源码用它包装用于运算的张量。",
  "torch.utils.cpp_extension.CUDAExtension": "用于声明需要编译的 C++ 和 CUDA 源文件，生成 Python 可导入的扩展。",
  "torch.utils.cpp_extension.BuildExtension": "PyTorch 的扩展构建类，由打包工具调用来编译原生源码。",
  "argparse.ArgumentParser": "命令行参数解析器。先登记可用选项，再从启动命令读取这些值。",
  "argparse.Namespace": "按属性名保存参数值的对象，例如用 args.model_path 读取模型路径。",
  "errno.EEXIST": "表示目标文件或目录已存在的系统错误编号。",
  "glob.glob": "按路径通配符查找匹配的文件，返回路径列表。",
  "math.exp": "计算自然指数 e 的指定次方。",
  "pathlib.Path": "Python 的路径类，用于拼接路径并访问文件和目录。",
  "plyfile.PlyData": "表示整个 PLY 文件的数据，能读取或写出点云数据。",
  "plyfile.PlyElement": "表示 PLY 文件的一组元素，例如带额外属性的顶点表。",
  "pytorch3d.ops.knn_points": "对每个查询点找到距离最近的 K 个点，用来建立局部邻域。",
  "pytorch3d.ops.knn_gather": "按近邻索引取出对应点的坐标或特征。",
  "pytorch3d.ops.sample_farthest_points": "逐次选离已选点最远的点，用来从点云选出分布较广的中心。",
  "setuptools.setup": "读取扩展的构建配置并登记为可安装的 Python 包。",
  "simple_knn._C.distCUDA2": "CUDA 扩展中的近邻距离函数，为每个点计算三个最近邻的平均平方距离。",
  "torch.nn.Module": "PyTorch 模型和网络层的基类，用来组织可训练参数和子模块。",
  "torch.utils.data.Dataset": "PyTorch 数据集基类。子类实现样本数量和按索引读取样本。",
  "torch.utils.tensorboard.SummaryWriter": "PyTorch 的日志写入类，把训练损失、图像等写入 TensorBoard 日志文件。",
  "torchdiffeq.odeint": "ODE 积分函数，根据变化率和已知起始状态求指定时刻的状态。",
  "tqdm.tqdm": "把可迭代对象包装成带进度条的循环。",
  "typing.NamedTuple": "用有名字的字段定义一种元组，既能按字段名访问也能按位置读取。",
};

const nativeTypes = {
  bool: "布尔类型，保存真或假并用于条件判断。",
  int: "整数类型，用于保存编号、计数或索引。",
  float: "单精度浮点类型，用来保存坐标、颜色或权重等数值。",
  double: "双精度浮点类型，提供比 float 更多的有效数字。",
  uint32_t: "无符号的 32 位整数类型。",
  uint64_t: "无符号的 64 位整数类型。",
  size_t: "无符号大小类型，用于表示数组长度、元素数量或字节数。",
  void: "用于表示函数没有返回值，也可用于声明未指定元素类型的指针。",
  float2: "CUDA 的二分量浮点结构，分量通过 x 和 y 访问。",
  float3: "CUDA 的三分量浮点结构，分量通过 x、y、z 访问。",
  float4: "CUDA 的四分量浮点结构，分量通过 x、y、z、w 访问。",
  uint2: "CUDA 的二分量无符号整数结构。",
  dim3: "CUDA 的三维尺寸类型，可指定核函数的网格和线程块大小。",
  std: "C++ 标准库的命名空间，用来定位向量、元组等标准工具。",
  glm: "GLM 数学库的命名空间，提供向量、矩阵和几何变换。",
  "glm::vec3": "GLM 的三分量浮点向量。",
  "glm::vec4": "GLM 的四分量浮点向量。",
  "glm::mat3": "GLM 的 3×3 浮点矩阵。",
  "glm::mat4": "GLM 的 4×4 浮点矩阵。",
  "torch::Tensor": "PyTorch 的 C++ 张量类型，原生扩展通过它读取或返回张量。",
  __global__: "CUDA 核函数的声明标记，启动时由 GPU 上的一组线程执行。",
  __device__: "CUDA 设备声明标记，此函数或对象供 GPU 端代码使用。",
  __shared__: "CUDA 共享内存标记，同一个线程块中的线程能访问这段存储。",
};

const stylesheetNames = {
  color: "设置文字的前景颜色。",
  background: "设置背景颜色、图片及其显示方式。",
  "background-color": "设置元素的背景颜色。",
  "font-family": "按顺序列出可使用的字体。",
  "font-size": "设置文字大小。",
  "font-weight": "设置文字粗细。",
  "line-height": "设置每行文字占用的高度。",
  margin: "设置元素边框外侧的间距。",
  padding: "设置元素内容与边框之间的间距。",
  border: "设置边框的宽度、样式和颜色。",
  display: "指定元素的布局方式，例如按块、弹性布局或网格显示。",
  position: "指定用文档流、父容器或视口作为定位依据。",
  width: "设置元素的宽度。",
  height: "设置元素的高度。",
};

const environmentNames = {
  name: "创建后用于识别和激活这个 Conda 环境的名称。",
  channels: "Conda 查找可安装依赖时使用的软件包来源。",
  dependencies: "创建环境时要安装的包及其版本要求。",
  pip: "列出交由 pip 安装的 Python 包。",
};
const typeMeanings = {
  "arguments.ModelParams": "场景和模型的配置类，保存数据路径、模型路径和相机读取等设置。",
  "arguments.PipelineParams": "渲染流程的配置类，控制球谐颜色和协方差在哪里计算，以及是否开启调试。",
  "scene.gaussian_model.GaussianModel": "管理场景中的基础高斯，保存位置、颜色、尺度、旋转和不透明度等参数。",
  "scene.Scene": "组织一个场景的相机和高斯模型，负责从点云初始化或加载已保存的高斯。",
  "scene.cameras.Camera": "保存单个视角的图像、相机位姿、投影矩阵和对应时刻。",
  "utils.graphics_utils.BasicPointCloud": "存放点坐标、颜色和法线的点云记录，用于初始化高斯。",
  "scene.dataset_readers.SceneInfo": "读取场景后得到的记录，包含初始点云、各组相机列表和场景范围。",
  "scene.dataset_readers.CameraInfo": "读取数据时整理出的相机记录，包含图像、位姿、视场和帧时间。",
  "scene.network.ODEFunc": "接收当前时刻和共享状态，预测这个状态的瞬时变化率。",
  "argparse.ArgumentParser": "Python 的命令行参数解析器，用来注册并读取运行选项。",
  "torch.Tensor": "PyTorch 的张量类型，用来保存可进行批量运算的数值数据。",
  "numpy.array": "NumPy 创建数组的函数。这里的类型标注表示这个值按 NumPy 数组来处理。",
  "typing.Optional": "表示这个值可以是方括号里的类型，也可以是 None。",
  "typing.Tuple": "表示由多项值组成的元组，方括号中列出各项的类型。",
  bool: "布尔类型，取值为 True 或 False，常用作开关或判断结果。",
  int: "整数类型，常用于数量、编号或索引。",
  float: "浮点数类型，用来表示时间、尺度等可以带小数的值。",
  str: "字符串类型，用来保存路径、名称等文本。",
  dict: "字典类型，用键来存取对应的值。",
  list: "列表类型，按顺序保存多项内容。",
};

const timeGridNames = {
  ts: "存放生成的等距时间点。积分器按这些时间点给出对应的状态。",
  "torch.linspace": "生成等距点的函数。这里从起始时间到目标时间取点，包含两个端点。",
  start: "linspace 的形参，指定第一个时间点。这里传入 t_start。",
  end: "linspace 的形参，指定最后一个时间点。这里传入 t_end。",
  t_start: "积分开始的时刻，也是生成的第一个时间点。",
  t_end: "要取出状态的目标时刻，也是生成的最后一个时间点。",
  steps: "linspace 的形参，指定要生成的时间点总数。",
  num_steps: "这次要生成的时间点总数，传给 linspace 的 steps 参数。",
  device: "linspace 的形参，指定新建的时间点张量放在哪个设备上。",
  "g_start.device": "起始状态所在的设备。用它创建时间点，两个张量就会在同一个设备上。",
  dtype: "linspace 的形参，指定时间点用什么数值类型存储。",
  "g_start.dtype": "起始状态的数值类型，例如 float32。时间点沿用这个类型。",
  g_start: "ODE 积分的起始状态，创建时间点时沿用它的设备和数值类型。",
};

const loadOnDemandMeaning = "相机数据按需加载的开关。开启时，训练或渲染用到当前视角才把它的数据移到 GPU。";

const scopedNames = {
  "train.py": [
    [1, 462, {
      TENSORBOARD_FOUND: "布尔标记，表示当前环境是否成功导入 TensorBoard 日志写入工具。",
      "self.gaussians": gaussianModelName,
      "self.progress_bar": "显示当前训练进度及损失统计的进度条对象。",
      "self.ema_loss_for_log": "按指数移动平均平滑后的训练总损失。",
      tb_writer: "TensorBoard 日志写入对象，用来保存训练损失、耗时和图像等记录。",
      "self.tb_writer": "当前训练器的 TensorBoard 日志写入对象，用来记录这一轮训练的指标。",
      "self.viewpoint_stack": "当前采样轮次尚未抽到的相机列表。",
      "self.scene.init_cameras": "用于训练预热阶段的相机集合。",
      "self.opt.gradual": "逐步扩大训练时间范围的开关，开启时由早到晚纳入更多视角。",
    }],
    [40, 151, {
      scene: "当前场景对象，管理高斯模型和各组相机。",
      "scene.gaussians": gaussianModelName,
      test_psnr: "训练报告返回的平均峰值信噪比，用来衡量评估视角的图像质量。",
      validation_configs: "评估要遍历的视角分组，包含测试相机和抽取的一组训练相机。",
      config: "当前参与评估的一组视角及其分组名。",
      l1_test: "当前分组收集的逐视角 L1 图像误差。",
      psnr_test: "当前分组收集的逐视角 PSNR。",
      psnr_value: "当前这一张预测图与真实图的 PSNR。",
      psnr_fid_reconstruction: "拍摄时间早于评估分界的各视角 PSNR。",
      psnr_fid_extrapolation: "拍摄时间达到或晚于评估分界的各视角 PSNR。",
      psnr_fid_reconstruction_mean: "重建时间段内各视角的平均 PSNR。",
      psnr_fid_extrapolation_mean: "外推时间段内各视角的平均 PSNR。",
      fid: "当前评估视角对应的拍摄时刻，用来选择高斯形变的时间。",
      xyz: "每个高斯在参考场景中的三维中心坐标。",
      sh: "每个高斯颜色的零阶球谐系数。",
      r: "基础高斯的旋转四元数。",
      s: "基础高斯沿三个轴的尺度。",
      a: "基础高斯的不透明度。",
      feature: "形变网络需要的逐高斯输入，每个高斯对应一行 14 维属性。",
      deform_pkgs: "目标时刻的高斯形变数据，包含位置、旋转和尺度的变化。",
      d_xyz: "目标时刻各高斯中心的位移。",
      d_rotation: "目标时刻各高斯的旋转变化。",
      d_scaling: "目标时刻各高斯三个轴的尺度变化。",
      image: "从当前相机视角渲染出的预测 RGB 图像。",
      gt_image: "当前相机视角对应的真实图像，用作评估的参考。",
    }],
    [110, 145, {
      l1_test: "当前分组在所有视角上的平均 L1 图像误差。",
      psnr_test: "当前分组在所有视角上的平均 PSNR。",
    }],
    [152, 160, {
      "self.dataset": "训练器使用的数据集与场景配置。",
      "self.args": "启动训练时解析出的命令行选项。",
      "self.opt": "训练用的优化配置，包含迭代次数和学习率等设置。",
    }],
    [180, 265, {
      dataset_max_time: "当前训练相机集合中最晚的拍摄时刻。",
      cur_max_fid: "这一轮训练允许纳入视角的最晚时刻，用来逐步扩大训练的时间范围。",
      viewpoint_cam: "此次迭代抽到的相机视角，提供相机参数、真实图像和时间。",
      fid: "此次迭代所选相机的拍摄时刻。",
      feature: "形变网络的逐高斯输入，每行包含一个高斯的几何和外观属性。",
      xyz: "每个高斯在参考场景中的三维中心坐标。",
      sh: "每个高斯颜色的零阶球谐系数。",
      r: "基础高斯的旋转四元数。",
      s: "基础高斯沿三个轴的尺度。",
      a: "基础高斯的不透明度。",
      d_xyz: "各高斯在当前时刻的中心位移。",
      d_rotation: "当前时刻各高斯的旋转变化。",
      d_scaling: "当前时刻各高斯三个轴的尺度变化。",
      render_pkg_re: "这一轮渲染得到的图像、投影坐标和可见性等数据。",
      radii: "每个高斯投影到屏幕后的半径，用于训练时判断其屏幕大小。",
      gt_image: "该视角实际拍摄的图像，用来监督模型。",
      Ll1: "预测图像与真实图像的逐像素绝对误差均值。",
      loss: "本次迭代回传给模型的损失，结合图像误差和已启用的正则项。",
    }],
    [195, 195, {
      "viewpoint.fid": "每个候选相机的拍摄时刻，这里取最大的值作为数据中最晚的时刻。",
    }],
    [212, 212, {
      randint: "random 模块里的随机整数函数。这里从 0 到列表的最后一个索引等概率抽一个索引。",
      "self.viewpoint_stack": "本轮还没抽到的相机列表，取出一个视角后就从这个列表移除。",
      "self.viewpoint_stack.pop": "列表方法。按抽到的索引取出对应相机，同时从候选列表移除它。",
    }],
    [218, 280, {reg: "散度正则损失的记录值，未取到散度损失时为零。"}],
    [327, 373, {
      "self.deform.OdeTransformer.encoder.cache": "编码器缓存的近邻特征，基础高斯变化后需要重新计算。",
      d_xyz: "各高斯在当前时刻的三维中心位移，预热时可能是标量零。",
      _disp: "当前可用的逐高斯位移张量，没有位移张量时为 None。",
      "self.deform.OdeTransformer.encoder.vis_fps": "记录最远点采样过程的开关，用于保存可视化所需的采样中心。",
    }],
  ],
  "arguments/__init__.py": [
    [18, 134, {
      ParamGroup: "命令行配置的基类。把配置对象的属性登记为可从命令行传入的选项。",
      shorthand: "布尔标记，表示当前选项是否还要登记一个简写。",
      "self.white_background": "白色背景开关，控制图像透明区域的合成底色。",
      "self._resolution": "加载图像时使用的分辨率选项，控制降采样倍率或目标宽度。",
      "self.max_train_cameras": "加载训练相机时可保留的数量上限。",
      "self.max_init_cameras": "初始化相机列表可保留的数量上限。",
      "self.max_val_cameras": "加载验证相机时可保留的数量上限。",
      "self.max_test_cameras": "加载测试相机时可保留的数量上限。",
      "g.source_path": "供场景读取器使用的数据集绝对路径。",
      "self.eval": "传给场景读取器的评估模式开关。",
      "self.load2gpu_on_the_fly": loadOnDemandMeaning,
      "self.size": "场景配置中的 size 字段，默认未提供尺寸。",
      "self.convert_SHs_python": "球谐颜色的计算位置开关，开启时由 Python 先求出 RGB。",
      "self.compute_cov3D_python": "三维协方差的计算位置开关，开启时由 Python 先求出协方差。",
      "self.debug": "传给高斯光栅化器的调试开关。",
      "self.disable_ws_prune": "名为 disable_ws_prune 的布尔配置项，可通过同名命令行选项设置。",
      "self.reg_after_densify": "名为 reg_after_densify 的布尔配置项，可通过同名命令行选项设置。",
      "self.gradual": "训练时间范围逐步扩大的开关。",
    }],
  ],
  "gaussian_renderer/__init__.py": [
    [20, 27, {
      w: "相乘所得四元数的标量分量。",
      x: "相乘所得四元数的第一个向量分量。",
      y: "相乘所得四元数的第二个向量分量。",
      z: "相乘所得四元数的第三个向量分量。",
    }],
    [33, 165, {
      pc: gaussianModelName,
      "pc.get_xyz.dtype": "三维中心坐标张量的元素数值类型。",
      "pc.max_sh_degree": "高斯模型支持的最大球谐阶数。",
      "pc.get_features.transpose": "张量的方法，交换球谐系数轴和 RGB 通道轴。",
      "viewpoint_camera.camera_center": "当前相机在世界坐标系中的三维中心位置。",
      means3D: "各高斯形变后的三维中心坐标。",
      valid: "逐高斯的布尔掩码，表示各高斯是否通过相机深度筛选。",
      shs_view: "按高斯、RGB 通道、球谐系数三个轴排列的颜色张量。",
      dir_pp: "从相机中心分别指向各高斯基础中心的向量。",
      screenspace_points: "承接高斯屏幕投影位置梯度的张量，用于训练时决定在哪里增密。",
      means2D: "传给光栅化器的屏幕空间梯度占位张量。",
      opacity: "各高斯的不透明度，用于计算它们对像素颜色的贡献。",
    }],
    [75, 114, {
      scales: "每个高斯沿三个轴的尺度，光栅化器可用它和旋转求三维协方差。",
      rotations: "每个高斯的旋转四元数，用于确定其三维椭球的朝向。",
      cov3D_precomp: "在 Python 端预先算好的三维协方差，可直接传给光栅化器。",
      shs: "每个高斯的球谐系数，用于按观察方向计算颜色。",
      colors_precomp: "传给光栅化器的预计算 RGB，包括 Python 计算的颜色或调用者指定的颜色。",
    }],
  ],
  "render.py": [
    [39, 45, {gaussians: gaussianModelName}],
    [48, 53, {value: "要转换为 Python 浮点数的评估指标值。"}],
    [72, 218, {
      gaussians: gaussianModelName,
      d_xyz: "加到各高斯基础中心上的三维位移。",
      d_rotation: "与各高斯基础旋转组合的四元数增量。",
      d_scaling: "加到各高斯基础对数尺度上的三轴增量。",
      render_np: "按高度、宽度、RGB 通道排列的 NumPy 图像数组。",
      render_root: "当前场景和检查点的输出根目录。",
      render_path: "预测 RGB 图像的存放目录。",
      gts_path: "真实参考图像的存放目录。",
      depth_path: "深度图的存放目录。",
      speed_path: "记录渲染速度的文本文件路径。",
      total_time: "所有待渲染视角累计使用的渲染时间。",
      inter_psnr: "重建时间段的 PSNR 累计值。",
      outer_psnr: "外推时间段的 PSNR 累计值。",
      inter_ssim: "重建时间段的 SSIM 累计值。",
      outer_ssim: "外推时间段的 SSIM 累计值。",
      inter_lpips: "重建时间段的 LPIPS 累计值。",
      outer_lpips: "外推时间段的 LPIPS 累计值。",
      inter_cet: "已经纳入重建时间段统计的视角数量。",
      outer_cet: "已经纳入外推时间段统计的视角数量。",
      metric_ssim: "比较两张图像在结构上是否相似的指标对象。",
      metric_lpips: "比较两张图像在深度特征上是否接近的指标对象。",
      dxyz0: "所有高斯在初始时刻相对各自基准中心的位移。",
      sampled_time: "用于检查高斯运动幅度的一组时刻。",
      static_mask: "标记采样期间运动幅度持续低于阈值的高斯。",
      motion_mask: "标记被归为运动部分的高斯。",
      displacement: "每个高斯在当前采样时刻相对初始时刻的移动距离。",
      to8b: "把零到一之间的图像值转换成可保存的 8 位像素的函数。",
      fid: "当前渲染视角对应的目标时刻。",
      rendering: "目标时刻从当前视角渲染出的图像。",
      gt: "与当前渲染视角配对的参考图像。",
    }],
    [230, 282, {
      metrics: "本次渲染和评估得到的指标，来自 render_set 的返回值。",
    }],
  ],
  "metrics.py": [
    [87, 90, {
      lpipss: "保存逐张图所得 LPIPS 距离的列表。",
      lpips_fn: "计算两张图像感知差异的 LPIPS 指标模型。",
      renders: "与真实图像逐张配对的预测图像列表。",
      gts: "与预测图像逐张配对的真实图像列表。",
      idx: "当前参与比较的一对图像的下标。",
    }],
    [92, 94, {
      mae: "由每张图像的 PSNR 换算回线性尺度得到的均方误差。",
      psnrs: "各张图像的 PSNR 数值，这里将它们转换为线性误差，再计算汇总指标。",
    }],
  ],
  "scene/dataset_readers.py": [
    [61, 70, {
      step: "相邻两个抽样位置在原列表中的间隔。",
      indices: "要从原列表保留的元素索引。",
    }],
    [72, 88, {
      P: "相机投影矩阵，包含内参和位姿信息。",
      lines: "相机参数文本中用于构造投影矩阵的数值记录。",
      K: "由投影矩阵分解得到的相机内参矩阵。",
      R: "由投影矩阵分解得到的相机旋转矩阵。",
      t: "由投影矩阵分解得到的相机齐次位置向量。",
    }],
    [95, 116, {
      diagonal: "相机中心距离平均位置的最大距离。",
      radius: "包围相机中心的归一化半径，取最大相机偏移距离的 1.1 倍。",
      translate: "把相机中心的平均位置移到原点的平移向量。",
    }],
    [119, 160, {
      extr: "当前相机的 COLMAP 外参记录，包含旋转和平移。",
      intr: "当前相机使用的 COLMAP 内参记录，包含图像尺寸和焦距参数。",
    }],
    [162, 172, {
      vertices: "PLY 文件的顶点表，每条记录对应一个点。",
      normals: "PLY 点云每个点的三维法向量。",
    }],
    [244, 294, {norm_data: "归一化到 0 到 1 的 RGBA 图像数组，用于透明度合成。"}],
    [360, 415, {
      P: "由世界矩阵和尺度矩阵组合得到的相机投影矩阵。",
      a: "当前相机位姿矩阵的第一行。",
      b: "当前相机位姿矩阵的第二行，用于转换坐标轴。",
      c: "当前相机位姿矩阵的第三行，用于转换坐标轴。",
    }],
    [448, 515, {
      name: "数据集所在上一级目录的名称，用来选择图像划分规则。",
      all_img: "训练与验证部分合并后要读入的图像标识。",
      all_id: "数据集记录的全部图像标识，供隔帧取样。",
      position: "转换成相机外参形式后的平移向量。",
    }],
    [497, 515, {all_img: "按图像标识构造出来的待加载 PNG 路径列表。"}],
    [523, 551, {
      train_cam_infos: "按数据集划分得到的训练相机记录。",
      test_cam_infos: "训练划分以外用作测试的相机记录。",
      num_pts: "读取的初始点云中包含的点数。",
    }],
    [561, 608, {
      H: "相机位姿文件中附带的原始图像高度。",
      W: "相机位姿文件中附带的原始图像宽度。",
      poses: "转换到当前读取器坐标约定的一组相机位姿。",
    }],
    [37, 52, {depth: "相机记录中可选的像素深度数据。"}],
    [53, 744, {pcd: "场景的初始点云，包含点坐标和颜色等属性。"}],
    [208, 208, {
      "x.image_name": "候选相机记录的图像名，排序时用作比较键。",
    }],
  ],
  "scene/colmap_loader.py": [
    [53, 67, {qvec: "由旋转矩阵求得的四元数，标量分量排在第一位。"}],
    [190, 199, {current_char: "从 COLMAP 记录的图像名中刚读出的一个字节。"}],
    [87, 113, {
      xyzs: "从 COLMAP 点文件读取的三维坐标数组。",
      rgbs: "点云各点的 RGB 颜色数组。",
      errors: "COLMAP 点记录里的误差值数组。",
    }],
  ],
  "scene/deform_model.py": [
    [37, 39, {
      pkg: "当前视角的高斯形变数据字典。",
      x: "当前变换所依据的各高斯基础中心坐标。",
    }],
    [277, 277, {x_de: "已断开梯度跟踪的输入点坐标张量。"}],
    [1, 275, {
      "self.optimizer": "形变网络的优化器，用训练梯度更新网络参数。",
      "self.net_lr_scheduler": "按训练迭代计算形变网络学习率的函数。",
      "self.OdeTransformer.encoder.cache_knn_idx": "编码器缓存的近邻索引，散度计算可复用这些索引。",
    }],
    [76, 215, {
      knn_idx: "每个采样组内的近邻高斯索引。",
      patch_idx: "参与正则项计算的采样组索引表，每行包含中心及其近邻。",
    }],
    [175, 220, {
      seed_idx: "每个采样组中心的高斯索引。",
      nbr_idx: "每个采样组内除中心之外的近邻高斯索引。",
      scale_j: "各近邻高斯在三个轴上的尺度。",
    }],
  ],
  "scene/gaussian_model.py": [
    [30, 510, {
      self: "当前正在操作的 GaussianModel 对象。",
      opacities_new: "限制不透明度以后得到的原始参数值。",
      "self.percent_dense": "相对于场景范围的尺度比例，用来区分拆分和复制的高斯。",
      prune_mask: "逐高斯的布尔掩码，标记待移除的高斯。",
      big_points_ws: "逐高斯的布尔掩码，标记实际尺度过大的高斯。",
      values: "沿各高斯的三个尺度分量求得的最大值。",
      "self.active_sh_degree": "渲染时目前启用的球谐阶数。",
      "self.max_sh_degree": "模型支持的最大球谐阶数。",
      "self._xyz": "基础高斯在参考场景中的可训练中心坐标。",
      "self._opacity": "模型内部保存的原始不透明度参数。",
      "self.og_number_points": "加载模型时记录的初始点云点数。",
      "self._scaling": "模型内部保存的各高斯对数尺度。",
      "self._rotation": "用于表示各高斯朝向的原始四元数参数。",
      "self.xyz_gradient_accum": "各高斯在屏幕位置上累积的梯度幅度，用于增密判断。",
      "self.xyz_gradient_accum_abs": "给每个高斯预留的绝对梯度累加缓冲区。",
      "self.xyz_gradient_accum_abs_max": "给每个高斯预留的绝对梯度最大值缓冲区。",
      "self.denom": "各高斯参与梯度统计的次数，用于计算平均梯度。",
      "self.max_radii2D": "各高斯历次渲染中记录的最大屏幕投影半径。",
    }],
    [167, 180, {
      xyz: "各高斯的基础中心坐标，按每个高斯一行存为 NumPy 数组。",
      opacities: "模型保存的未做 Sigmoid 转换的不透明度参数数组。",
      scale: "各高斯的三轴对数尺度参数数组。",
      rotation: "各高斯的未归一化旋转四元数参数数组。",
    }],
    [338, 362, {
      n_init_points: "拆分操作开始前的高斯数量。",
      repeat: "PyTorch 张量的方法，沿各轴重复给定次数。",
      stds: "每个被选中高斯的三轴采样标准差。",
      rots: "各被选中高斯的三维旋转矩阵。",
      samples: "围绕原高斯局部中心采样的三维偏移。",
      new_xyz: "拆分后新生成高斯的三维中心坐标。",
    }],
    [338, 374, {selected_pts_mask: "逐高斯的布尔掩码，标记通过当前增密筛选的高斯。"}],
    [400, 443, {
      xyz: "参与可见性筛选的各高斯三维中心坐标。",
      xyz_cam: "从世界坐标转换到当前相机坐标系后的高斯中心。",
    }],
    [479, 485, {
      xyz: "各高斯加上位移后的三维中心坐标数组。",
      opacities: "模型保存的未做 Sigmoid 转换的不透明度参数数组。",
      scale: "叠加变化量后的三轴对数尺度数组。",
      rotation: "与旋转增量相乘后得到的旋转四元数数组。",
    }],
    [470, 475, {
      w: "相乘所得四元数的标量分量。",
      x: "相乘所得四元数的第一个向量分量。",
      y: "相乘所得四元数的第二个向量分量。",
      z: "相乘所得四元数的第三个向量分量。",
    }],
    [1, 95, {
      "self.optimizer": "基础高斯参数的优化器，用于更新位置、颜色、尺度等属性。",
      actual_covariance: "每个高斯在三维空间中的协方差矩阵。",
      features_dc: "每个高斯与观察方向无关的零阶球谐颜色系数。",
      features_rest: "每个高斯用于描述颜色随观察方向变化的高阶球谐系数。",
      "self.scaling_activation": "把内部尺度参数转换为可用于渲染的正尺度的函数。",
      "self.rotation_activation": "把内部旋转参数变成单位四元数的归一化函数。",
      "self.hyper_activation": "把特征最后一维转换成总和为 1 的权重的函数。",
      "self.scaling_inverse_activation": "把实际尺度转换回模型内部参数的函数。",
      "self.covariance_activation": "根据高斯的尺度和旋转构造三维协方差的函数。",
      "self.opacity_activation": "把内部不透明度参数转换为零到一之间的不透明度的函数。",
      "self.inverse_opacity_activation": "把实际不透明度转换回模型内部参数的函数。",
    }],
  ],
  "scene/cameras.py": [
    [18, 94, {
      "self.uid": "创建相机对象时为该视角分配的编号。",
      "self.colmap_id": "输入相机记录原有的编号。",
      "self.R": "相机外参中的旋转矩阵，用来描述相机朝向。",
      "self.T": "相机外参中的平移向量，用于构造世界到相机的变换。",
      "self.image_name": "该相机记录对应的图像名称。",
      "self.depth": "该视角的逐像素深度图，可能为空。",
      "self.gt_alpha_mask": "该视角参考图像自带的透明度掩码。",
      "self.camera_center": "相机光心在世界坐标中的三维位置。",
      "self.image_width": "这一相机视角的图像宽度，单位是像素。",
      "self.image_height": "这一相机视角的图像高度，单位是像素。",
      "self.FoVy": "相机在竖直方向的视场角。",
      "self.FoVx": "相机在水平方向的视场角。",
      "self.znear": "相机视锥近裁剪面对应的深度。",
      "self.zfar": "相机视锥远裁剪面对应的深度。",
      "self.full_proj_transform": "合并视图变换与投影的矩阵，将世界坐标映射到裁剪空间。",
    }],
  ],
  "scene/neu3d.py": [
    [55, 84, {poses_centered: "以平均相机位姿为参考重新表示的一组相机位姿。"}],
    [237, 255, {
      "self.white_bg": "数据集配置中的白色背景标记。",
      "self.ndc_ray": "数据集配置中的光线坐标标记，NDC 指归一化设备坐标。",
      "self.depth_data": "数据集配置中的深度数据标记。",
    }],
    [231, 243, {
      "self.is_stack": "构造参数里用于表示是否采用堆叠数据形式的开关。",
      "self.N_vis": "传入的可视化视角数量配置。",
      "self.time_scale": "初始化时保存的时间缩放配置。",
      "self.bd_factor": "初始化时保存的场景深度边界缩放因子。",
      "self.eval_step": "初始化时传入的评估步距设置。",
    }],
    [260, 272, {
      H: "相机元数据里记录的原始图像高度。",
      W: "相机元数据里记录的原始图像宽度。",
      focal: "相机的像素焦距，随后按图像缩放倍率换算。",
    }],
    [285, 299, {
      H: "数据集加载图像时的高度。",
      W: "数据集加载图像时的宽度。",
      "self.poses": "训练摄像机的位姿列表，已排除评估相机。",
      "self.poses_all": "读取出的全部摄像机位姿。",
      "self.cam_number": "当前划分加载的摄像机数量。",
      "self.time_number": "当前划分记录的时间采样数量。",
    }],
    [344, 366, {
      R: "当前相机位姿的旋转部分。",
      T: "把世界坐标转换到当前相机坐标时使用的平移向量。",
      t: "视频帧按顺序归一化到零到一的时间。",
      N_time: "读取到的有效视频帧数量。",
    }],
  ],
  "utils/camera_utils.py": [
    [1, 57, {
      WARNED: "布尔标记，记录是否已提示过大尺寸输入图像会被缩小。",
      loaded_mask: "相机图像的可选透明度掩码，从 RGBA 图像的第 4 个通道取得。",
      global_down: "图像加载时根据原始和目标宽度计算的基础下采样倍率。",
    }],
    [52, 57, {
      "args.data_device": "配置中的相机数据设备。未开启按需上传时，将该设备传给 Camera。",
    }],
    [70, 84, {pos: "相机光心在世界坐标中的三维位置，用于导出相机记录。"}],
  ],
  "utils/time_utils.py": [
    [12, 52, {
      embed: "把输入数据交给位置编码器处理的函数。",
      "self.kwargs": "配置位置编码器用的选项字典。",
      d: "一个输入点需要编码的分量数。",
      freq_bands: "生成正弦和余弦编码时使用的一组频率倍率。",
      "self.out_dim": "拼接各路编码以后得到的总特征数。",
    }],
    [58, 199, {
      "self.D": "多层感知机的层数配置。",
      "self.W": "多层感知机隐藏层的宽度。",
      "self.hyper_ch": "输入运动编码的特征维数。",
    }],
    [64, 70, {"self.input_ch": "位置编码前的坐标分量数。"}],
    [71, 115, {"self.input_ch": "拼接空间编码、时间编码和运动编码后的输入维数。"}],
    [110, 168, {gate: "可选的运动门控权重，用来缩放网络输出的形变。"}],
    [125, 155, {
      w: "六自由度形变的旋转分量，归一化后用于构造变换轴。",
      v: "六自由度形变的平移分量，参与构造旋转和平移的联合变换。",
    }],
    [143, 171, {
      d_xyz: "位置分支预测的高斯空间变换。",
      scaling: "经门控调节后用于缩放高斯的预测尺度变化。",
    }],
  ],
  "utils/pose_utils.py": [
    [5, 22, {
      trans_t: "按指定距离构造沿 Z 轴平移矩阵的函数。",
      rot_phi: "按指定弧度构造绕 X 轴旋转矩阵的函数。",
      rot_theta: "按指定弧度构造绕 Y 轴旋转矩阵的函数。",
    }],
    [24, 38, {tHetaf: "从旋转矩阵恢复旋转向量时使用的缩放系数。"}],
    [67, 90, {
      R: "生成漫游轨迹时作为参考的相机旋转矩阵。",
      T: "从参考相机平移量构造出的列向量。",
      x_trans: "漫游轨迹当前帧沿 X 轴的位移。",
      y_trans: "漫游轨迹当前帧沿 Y 轴的位移。",
      z_trans: "漫游轨迹当前帧沿 Z 轴的位移。",
    }],
  ],
  "utils/general_utils.py": [
    [62, 118, {delay_rate: "训练初段用于让学习率平缓升至目标倍率的系数。"}],
    [137, 156, {q: "按长度归一化后的旋转四元数。"}],
    [190, 207, {
      old_f: "替换标准输出前保存的原始输出流。",
      "self.silent": "控制标准输出包装器是否静默的开关。",
    }],
    [195, 207, {
      F: "包装标准输出的类。它可以按配置抑制输出，也能在换行时附上时间。",
    }],
  ],
  "utils/loss_utils.py": [
    [155, 155, {
      pc_transformed: "各物体的刚体变换应用到点云后得到的三维点坐标。",
      n_batch: "这一批输入含有的点云样本数量。",
      n_object: "每个点云样本中的物体数量。",
      n_point: "每个点云样本的点数。",
    }],
    [175, 175, {
      nn_mask: "每个点的各个近邻对应的物体归属权重。",
      idx: "每个点对应的近邻下标。",
    }],
    [58, 83, {ssim_map: "两张图在各位置的局部结构相似度。"}],
    [89, 135, {
      pc1_centered: "去掉质心位置后的第一组点云坐标，用于估计旋转。",
      pc1_mean: "第一组点云的质心，用来恢复对齐变换的平移部分。",
      t: "把第一组点云旋转后再移到第二组点云位置所需的平移。",
    }],
    [181, 188, {loss: "掩码各分量对熵损失的贡献，随后按维度汇总。"}],
  ],
  "utils/metrics.py": [
    [58, 68, {min_val: "输入图像数值范围的下界，用来确定 SSIM 的动态范围。"}],
    [80, 97, {ssim_map: "两张图在各位置的局部结构相似度。"}],
  ],
  "utils/graphics_utils.py": [
    [43, 57, {cam_center: "应用场景平移和缩放后的相机光心坐标。"}],
  ],
  "scripts/package_checkpoints.py": [
    [140, 150, {manifest_path: "用于保存检查点打包清单的 JSON 文件路径。"}],
  ],
  "scene/network.py": [
    [13, 124, {
      B: "点云批次中包含的样本数。",
      N: "每个点云中可供采样的点数。",
      centers: "从原始点云抽取的分组中心坐标。",
      disp_norms: "每个高斯的位移幅度，用来判断运动强弱。",
    }],
    [103, 118, {score: "最远点采样对每个候选点给出的分数，由空间距离和运动权重共同决定。"}],
    [125, 160, {N: "每个点云中用来查询近邻的原始点数。"}],
    [220, 258, {group_features_global_max: "每个分组中各特征通道的最大值，用来给组内点补充分组信息。"}],
    [278, 288, {
      F: "每个输入点的特征维数。",
      q: "注意力的查询向量，用来与其他点的键比较。",
      k: "注意力的键向量，用来与查询计算匹配分数。",
      v: "注意力按权重加总的值向量。",
    }],
    [283, 283, {attn: "各查询和各键之间的匹配分数。"}],
    [284, 286, {attn: "用来加总各值向量的注意力权重。"}],
    [464, 521, {
      l: "编码器生成的逐高斯局部特征。",
      knn_idx: "采样中心周围近邻点的索引，可供后续读取特征或计算散度。",
      neighbors: "按采样中心组织的近邻特征。",
      encoded_features: "按分组聚合后的特征，供注意力模块继续压缩。",
      g0: "用来开始时间积分的场景共享初始状态。",
    }],
    [558, 567, {
      t_tensor: "供动力学网络读取的当前时刻张量。",
      h: "状态向量和时间组成的动力学网络输入。",
      h1: "第一组网络计算出的中间特征。",
      dzdt: "共享状态在当前时刻的变化率。",
    }],
    [633, 664, {
      g_t: "积分得到的共享状态，供指定时刻的解码使用。",
      z_t: "把目标时刻的共享状态和逐高斯局部特征合在一起得到的特征。",
      l: "每个高斯的局部特征，供解码器恢复逐高斯形变。",
      g0: "编码器给出的共享初始状态。",
    }],
    [643, 644, {g_t: "沿时间网格计算出的一系列共享状态，每个时间点对应一项。"}],
    [164, 211, {
      "self.motion_kwargs": "控制运动感知分组的配置字典。",
      disp_norms: "每个高斯的位移幅度，用来判断运动强弱。",
      "self.vis": "最远点采样的记录开关，用来收集采样结果供可视化。",
      centers: "每个批次采样得到的三维分组中心坐标。",
      sorted_idx: "按位移幅度从大到小排列的点下标。",
      n_high: "记录的高运动点数量。",
      "self.last_centers": "最近一次采样选出的分组中心坐标。",
      "self.last_high_idx": "最近一次记录的高运动点索引。",
    }],
    [322, 365, {"self.queries": "可训练的注意力查询向量，用于从输入特征聚合信息。"}],
    [345, 359, {H: "每个输入点的隐藏特征维数。"}],
    [598, 604, {
      v: "解码器预测的逐高斯平移分量。",
      w: "解码器预测的逐高斯旋转轴角向量。",
      r: "解码器预测的逐高斯旋转四元数。",
      s: "解码器预测的逐高斯三轴尺度变化。",
    }],
    [619, 643, {"self.odeint": "根据动力学网络给出的变化率推进共享状态的 ODE 积分函数。"}],
    [622, 631, {
      g0: "编码得到的场景共享初始状态，用作积分的起点。",
      l: "编码得到的逐高斯局部特征，后续用于解码形变。",
    }],
    [410, 521, {
      "self.cache": "编码器缓存的近邻特征，后续可复用以减少分组计算。",
      "self.cache_knn_idx": "编码器缓存的各组近邻点索引。",
      neighbors: "每个分组的近邻点特征张量。",
      knn_idx: "每个分组中心对应的近邻点下标。",
      "self.g0_cache": "编码器缓存的共享初始状态 g0，用于复用上一次的编码结果。",
    }],
    [533, 555, {
      input_dim: "共享状态向量的长度。网络最终输出也回到这个维数。",
      hidden_dim: "中间网络层的特征宽度。",
      time_input_ch: "表示时间所用的特征数，与状态向量拼接后形成网络输入。",
      "self.net1": "变化率网络的第一组串联层，产生供下一步使用的中间向量。",
      "self.net2": "变化率网络的第二组串联层，输出对中间向量的修正。",
    }],
    [633, 644, timeGridNames],
    [608, 631, {"self.cache": "推理阶段的编码缓存，保存逐高斯局部特征 l 和共享初始状态 g0。"}],
  ],
  "submodules/depth-diff-gaussian-rasterization/diff_gaussian_rasterization/__init__.py": [
    [94, 179, {
      raster_settings: "光栅化所需的相机参数、图像尺寸、背景等配置。",
      "ctx.raster_settings": "为反向传播保留的光栅化配置。",
      "self.raster_settings": "当前光栅化器保存的渲染配置。",
      num_rendered: "前向光栅化生成的高斯与图块相交记录数。",
      "ctx.num_rendered": "为反向传播保留的高斯与图块相交记录数。",
      colors_precomp: "预先计算好的各高斯 RGB 颜色。",
      means3D: "各高斯在三维空间中的中心坐标。",
      scales: "各高斯沿三个轴的尺度。",
      rotations: "各高斯的旋转四元数。",
      cov3Ds_precomp: "预先计算好的三维协方差。",
      radii: "各高斯投影到图像上的半径。",
      sh: "描述各高斯颜色随视角变化的球谐系数。",
      geomBuffer: "前向光栅化保存的高斯几何数据缓冲区。",
      binningBuffer: "保存高斯分配到图块及其排序信息的缓冲区。",
      imgBuffer: "保存像素合成过程信息的缓冲区，供反向传播读取。",
    }],
  ],
  "submodules/depth-diff-gaussian-rasterization/cuda_rasterizer/forward.cu": [
    [296, 380, {
      T: "当前像素的剩余透过率。每叠加一个高斯就乘上 1 − alpha，用它控制后面高斯还能贡献多少。",
      alpha: "当前高斯在这个像素处的不透明度，用来计算它贡献的颜色和深度。",
      test_T: "试着叠加这个高斯后的剩余透过率。过低时停止继续处理这个像素。",
      power: "高斯衰减的指数项。由像素和高斯中心的屏幕距离及椭圆形状计算。",
      con_o: "当前高斯在屏幕上的椭圆参数和基础不透明度，前三项描述形状，w 保存基础不透明度。",
      "con_o.w": "当前高斯的基础不透明度。乘上该像素位置的高斯衰减，得到这个像素的不透明度。",
      C: "这个像素各颜色通道的累加结果，逐个加入高斯的颜色贡献。",
      D: "这个像素的深度累加值，每个高斯的深度按 alpha 与剩余透过率 T 加权。",
      collected_id: "当前批加载到共享内存的高斯索引，用于找到每个高斯的颜色和深度。",
      last_contributor: "最后一个实际参与像素合成的高斯在遍历中的位置，写入输出供反向计算使用。",
    }],
  ],
  "scene/__init__.py": [
    [39, 133, {
      "self.loaded_iter": "已选中的检查点迭代编号，供加载对应的高斯状态。",
      "self.gaussians": "场景关联的高斯模型，保存可训练的几何和颜色参数。",
    }],
    [59, 89, {
      sceneLoadTypeCallbacks: "按数据集类型找到对应读取函数的字典。例如 Colmap 对应 COLMAP 场景读取器。",
      "args.source_path": "传给读取器的数据目录。",
      "args.images": "数据目录下存放 COLMAP 图像的子目录名，通常为 images。",
      "args.white_background": "控制透明区域与白底还是黑底合成。",
      "args.eval": "读取器接收的评估选项。",
      skip_train: "是否跳过训练和初始化视角。",
      skip_val: "是否跳过验证视角。",
      skip_test: "是否跳过测试视角。",
      max_train_cameras: "限制读取或保留的训练相机数量。",
      max_init_cameras: "限制保留的初始化相机数量。",
      max_val_cameras: "限制读取或保留的验证相机数量。",
      max_test_cameras: "限制读取或保留的测试相机数量。",
    }],
    [47, 52, {
      load_iteration: "指定加载哪个迭代。-1 表示选最大编号，None 表示跳过加载。",
      "self.loaded_iter": "记录最终选中的迭代编号，供后面的高斯模型加载使用。",
      "self.model_path": "存放模型、检查点和导出结果的目录。",
      searchForMaxIteration: "从保存目录读取已有的迭代编号，返回最大的一个。",
    }],
    [92, 93, {
      src_file: "用于读取原始 PLY 点云的文件对象。",
      dest_file: "用于写入模型目录下 input.ply 的文件对象。",
    }],
    [101, 106, {
      scene_info: "场景数据记录，包含初始点云和各组相机列表。",
      args: "当前场景配置，包含各组相机的数量上限。",
      "scene_info._replace": "返回一份替换了指定相机列表的新场景记录。",
      _replace: "返回一份替换了指定相机列表的新场景记录。",
      subsample_cam_infos: "在相机列表超过上限时，按列表位置选取其中的一部分。",
      train_cameras: "图像监督阶段使用的相机列表。",
      init_cameras: "初始化阶段使用的相机列表。",
      val_cameras: "验证阶段使用的相机列表。",
      test_cameras: "测试阶段使用的相机列表。",
      skip_train: "为真时跳过训练相机和初始化相机的采样。",
      skip_val: "为真时跳过验证相机的采样。",
      skip_test: "为真时跳过测试相机的采样。",
      max_train_cameras: "训练相机的保留上限。",
      max_init_cameras: "初始化相机的保留上限。",
      max_val_cameras: "验证相机的保留上限。",
      max_test_cameras: "测试相机的保留上限。",
    }],
  ],
};

const simpleName = /^[A-Za-z_$][\w$]*(?:(?:\.|::|->)[A-Za-z_$][\w$]*)*$/;
const codeNames = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\`(?:\\.|[^\`\\])*\`|\b(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?[fjLuU]?)\b|[A-Za-z_$][\w$]*(?:(?:\.|::|->)[A-Za-z_$][\w$]*)*/g;
const nativeCodeNames = new RegExp(String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/|${codeNames.source}`, "g");
const glossaryNames = new RegExp(Object.keys(glossary).sort((a, b) => b.length - a.length).join("|"), "g");
const sourceLinesForTerms = new WeakMap();
const nameContextIndex = window.PARTICLE_NAME_CONTEXTS || {files: {}, meanings: []};
const pythonKeywords = new Set(("False None True and as assert async await break class continue def del elif else except "
  + "finally for from global if import in is lambda nonlocal not or pass raise return try while with yield").split(" "));
const nativeKeywords = new Set(("if else for while do return break continue try catch finally throw class struct union enum "
  + "namespace import from as in switch case default template typename using new delete static inline const constexpr auto "
  + "public private protected virtual extern friend override final sizeof let var function extends export of then fi done "
  + "esac true false null nullptr NULL undefined").split(" "));
let proseTypes;

function vagueNameMeaning(value) {
  const text = typeof value === "string" ? value : value?.description || "";
  return /^(?:使用.+的值[。.]?$|保存本轮循环取到|代码在这里引用|成员访问 .+，从 |调用这里链接|从 .+ 导入的名称|导入的模块 .+，用来访问|这里调用 .+，将括号|这个函数接收的参数，由调用者|(?:对象的一个属性|本文件在这里定义的[函数类])|保存(?:右侧|表达式|对应语句算出的)|由 .+ 提供的值|.+，由 .+ 提供。$|写入值的|把[^。]+(?:保存到|赋给)[^。]+。?$|指定同名选项|作为第.*实参传入|候选值|执行.*调用|结果由该函数)/.test(text);
}

function shortMeaning(value) {
  if (typeof value !== "string") return "";
  const text = value.replace(explanationMarkup, (_, code, bold) => code ?? bold.replaceAll(String.fromCharCode(96), ""))
    .replace(/\s+/g, " ").trim();
  if (vagueNameMeaning(text)) return "";
  const parts = text.match(/[^。！？；]+[。！？；]?/g) || [];
  if (!parts.length) return "";
  const first = parts[0].trim();
  const second = parts[1]?.trim() || "";
  const summary = second && first.length + second.length < 96 ? first + second : first;
  return summary.length <= 125 ? summary : "";
}

function conciseIdentity(value) {
  const sentence = value?.match(/[^。！？；]+/)?.[0]?.trim();
  return sentence ? sentence + "。" : "";
}

function parameterIdentity(value) {
  if (typeof value !== "string") return "";
  const meaning = value.replace(/第\s*\d+\s*行(?:判断条件|提供循环的输入|参与计算或调用|参与构造返回结果)[\s\S]*$/, "");
  return conciseIdentity(shortMeaning(meaning));
}

function collectNameMeanings(file, first, last) {
  const {path} = file;
  const names = new Map(path.endsWith(".py") ? [...Object.entries(moduleNames), ...Object.entries(knownNames)]
    : /\.(?:c|cc|cpp|cu|cuh|h|hpp|inl)$/.test(path) ? Object.entries(nativeTypes) : []);
  const local = new Map();
  const variableNames = new Set();
  const loopBindings = new Map();
  const formalParameters = new Set();
  const keywordNames = new Set();
  const ambiguous = new Set();
  const entries = expressionIndex.files[path] || {};
  const scope = file.symbols?.findLast(([from, to, , kind]) => kind === "函数" && from <= first && first <= to);
  const putParameter = (name, value) => {
    name = name?.replace(/^\*{1,2}/, "");
    if (!simpleName.test(name || "")) return;
    formalParameters.add(name);
    const meaning = parameterIdentity(value);
    if (meaning) names.set(name, meaning);
  };
  const remember = (name, value) => {
    const meaning = shortMeaning(value);
    if (!meaning || !simpleName.test(name || "") || ambiguous.has(name)) return;
    if (local.has(name) && local.get(name) !== meaning) {
      local.delete(name);
      ambiguous.add(name);
    } else local.set(name, meaning);
  };
  const definitionAt = scope?.[0] ?? first;
  const definitionEnd = scope ? Math.min(scope[1], scope[0] + 7) : last;
  for (let line = definitionAt; line <= definitionEnd; line++) {
    for (const [label, detail, key, metadata] of entries[line]?.definition?.rows || []) {
      putParameter(metadata?.name || key || label, detail);
    }
    if (entries[line]?.definition) break;
  }

  function readArguments(arguments_, written) {
    for (const [label, fallback, children, info] of arguments_) {
      const meaning = parameterIdentity(argumentMeaning(label, info, fallback, written));
      if (info?.kind === "keyword") keywordNames.add(info.name);
      remember(info?.name, meaning);
      if (info?.value && info.value !== info.name && simpleName.test(info.value)) {
        remember(info.value, meaning);
      }
      children.forEach(child => readNode(child));
    }
  }

  function readNode(node, written) {
    if (node.kind === "call") {
      const name = shortCallName(node.name);
      const [origin, definitionLine] = node.target || [];
      const purpose = expressionIndex.files[origin]?.[definitionLine]?.definition?.purpose || node.purpose || node.result;
      remember(name, purpose);
      if (origin && !names.has(name)) {
        const detail = shortMeaning(purpose);
        if (detail) names.set(name, {description: detail, source: origin + " · 第 " + definitionLine + " 行"});
      }
      const member = name.split(/\.|::|->/).at(-1);
      if (member !== name && node.receiver?.length) remember(member, node.purpose || node.result);
      readArguments(node.arguments, written);
    }
    node.receiver?.forEach(child => readNode(child));
    node.children?.forEach(child => readNode(child));
    node.parts?.forEach(([, , children]) => children.forEach(child => readNode(child)));
  }

  let lines = sourceLinesForTerms.get(file);
  if (!lines) {
    lines = file.text.split("\n");
    sourceLinesForTerms.set(file, lines);
  }
  for (let line = first; line <= last; line++) {
    const entry = entries[line];
    const written = projectManual[path]?.[line];
    const example = lineGroup(path, line)?.[3].find(([start]) => start === line)?.[4];
    const parameterGuidance = written?.parameters || example?.parameters;
    entry?.nodes.forEach((node, index) => readNode(node, index === 0 && entry.outer ? parameterGuidance : undefined));
    const assignment = lines[line - 1]?.match(/^\s*([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)\s*=(?!=)/);
    if (assignment) remember(assignment[1], written?.result || (entry?.outer && entry.nodes[0].result));
    for (const [name, detail] of written?.parameters || []) remember(name, parameterIdentity(detail));
  }
  if (!entries[first]?.nodes.some(node => node.kind === "call")) {
    for (const [, , kind, , rows] of visibleParameterRecords(path, first, first, last)) {
      if (kind === "call") readArguments(legacyCallArguments(rows), projectManual[path]?.[first]?.parameters);
      else if (kind === "definition") {
        for (const [label, detail, key] of rows) {
          const name = key || parameterNames(label)[0];
          if (!formalParameters.has(name)) putParameter(name, detail);
        }
      }
    }
  }
  for (const [name, detail] of local) if (!names.has(name)) names.set(name, detail);
  if (path.endsWith(".py")) {
    for (const [type, meaning] of projectTypeNames()) if (!names.has(type)) names.set(type, meaning);
    addLocalBindings(file, lines, names, variableNames, loopBindings, first, last);
    addImportedModuleNames(file, lines, names, first, last);
  }
  for (let line = first; line <= last; line++) {
    for (const [name, id] of Object.entries(nameContextIndex.files[path]?.[line] || {})) {
      const detail = nameContextIndex.meanings[id];
      const current = names.get(name);
      if (!current || vagueNameMeaning(current)) {
        names.set(name, current?.source ? {description: detail, source: current.source} : detail);
      }
    }
  }
  if (path.startsWith("arguments/")) names.set("load2gpu_on_the_fly", loadOnDemandMeaning);
  for (const [start, end, meanings] of scopedNames[path] || []) {
    if (start <= first && last <= end) {
      for (const [name, meaning] of Object.entries(meanings)) names.set(name, meaning);
    }
  }
  for (const [name, meaning] of loopBindings) names.set(name, meaning);
  const gaussianOwners = {
    "train.py": ["scene.gaussians", "self.gaussians"],
    "render.py": ["gaussians"],
    "gaussian_renderer/__init__.py": ["pc"],
    "scene/gaussian_model.py": ["self"],
  }[path] || [];
  for (const [field, meaning] of Object.entries(expressionIndex.gaussianProperties || {})) {
    for (const owner of gaussianOwners) {
      const name = owner + "." + field;
      names.set(name, meaning);
      names.set(name + ".shape", "该张量各个维度的长度。第 0 维是高斯数量。");
    }
  }
  for (let line = first; line <= last; line++) {
    const valueName = entries[line]?.valueName;
    if (valueName) names.set(...valueName);
  }
  if (path.endsWith(".py")) {
    for (const [name, meaning] of Object.entries(expressionIndex.basicBuiltins || {})) {
      const shadowed = file.bindings?.[name]?.some(([, from, to]) => !from || from <= last && first <= to);
      if (!shadowed && !keywordNames.has(name)) names.set(name, meaning);
    }
  }
  const declaration = entries[first]?.definition;
  if (declaration) {
    const name = declaration.name.split(/\.|::/).at(-1);
    const meaning = shortMeaning(declaration.purpose);
    if (meaning) names.set(name, {description: meaning, source: path + " · 第 " + first + " 行"});
  }
  for (let line = first; line <= last; line++) {
    for (const [name, [canonical, path, definitionLine]] of Object.entries(file.types?.[line] || {})) {
      const description = Object.hasOwn(typeMeanings, canonical) ? typeMeanings[canonical] : "";
      if (path || description) {
        names.set(name, {
          description: description || "项目中的类。在这里用作类型标注。",
          source: path ? path + " · 第 " + definitionLine + " 行" : "",
        });
      }
    }
  }
  for (const name of new Set([...variableNames, ...formalParameters])) {
    const current = names.get(name);
    if (!current) continue;
    const description = typeof current === "string" ? current : current.description;
    const concise = formalParameters.has(name) ? parameterIdentity(description) : conciseIdentity(description);
    if (concise) {
      names.set(name, typeof current === "string" ? concise : {...current, description: concise});
    }
  }
  return names;
}

function projectTypeNames() {
  if (proseTypes) return proseTypes;
  proseTypes = new Map(Object.entries(typeMeanings).filter(([name]) => !name.includes(".")));
  for (const file of files) {
    for (const [start, , name, kind] of file.symbols || []) {
      const [canonical, origin, line] = file.types?.[start]?.[name] || [];
      if (kind !== "类" || !origin || !typeMeanings[canonical]) continue;
      proseTypes.set(name, {description: typeMeanings[canonical], source: origin + " · 第 " + line + " 行"});
    }
  }
  return proseTypes;
}

function importMeaning(origin, importingFile, seen = new Set()) {
  if (origin === "._C" && importingFile.endsWith("/diff_gaussian_rasterization/__init__.py")) {
    origin = "diff_gaussian_rasterization._C";
  }
  if (origin.startsWith(".")) {
    const lead = origin.match(/^\.+/)[0].length;
    const folders = importingFile.split("/").slice(0, -lead);
    origin = [...folders, origin.slice(lead)].filter(Boolean).join(".");
  }
  if (!origin || seen.has(origin)) return null;
  seen.add(origin);
  const known = knownNames[origin] || importedMembers[origin] || moduleNames[origin] || typeMeanings[origin];
  if (typeof known === "string") return known;

  const segments = origin.split(".");
  for (let end = segments.length; end > 0; end--) {
    const modulePath = segments.slice(0, end).join("/");
    const source = byPath.get(modulePath + ".py") || byPath.get(modulePath + "/__init__.py");
    if (!source) continue;
    const member = segments.slice(end).join(".");
    if (!member) {
      const purpose = projectGuide.files[source.path];
      return {description: purpose ? "项目模块。" + purpose : "从 " + source.path + " 加载的项目模块。", source: source.path};
    }
    const definition = source.symbols?.find(([, , name]) => name === member);
    if (definition) {
      const [line, , , kind] = definition;
      const note = expressionIndex.files[source.path]?.[line]?.definition?.purpose;
      const rawDoc = projectNotes[source.path]?.[line]?.[2];
      const detail = shortMeaning(note) || shortMeaning(rawDoc);
      if (detail) return {description: (kind === "类" ? "项目中的类。" : "项目中的函数。") + detail, source: source.path + " · 第 " + line + " 行"};
    }
    const reexport = source.bindings && Object.hasOwn(source.bindings, member) &&
      source.bindings[member].find(([, scope, , role]) => !scope && (role === "import" || role === "module"));
    if (reexport) return importMeaning(reexport[4], source.path, seen);
  }
  return null;
}

function addImportedModuleNames(file, lines, names, first, last) {
  for (let line = first; line <= last; line++) {
    const text = lines[line - 1] || "";
    const source = text.match(/^\s*from\s+([.\w]+)\s+import\b/);
    const imports = text.match(/^\s*import\s+([^#;]+)/);
    const modules = source ? [source[1]] : imports
      ? imports[1].split(",").map(part => part.trim().split(/\s+/)[0]) : [];
    for (const module of modules) {
      const relative = module.match(/^\.+/)?.[0] || "";
      const parts = module.slice(relative.length).split(".");
      for (let end = 1; end <= parts.length; end++) {
        const prefix = parts.slice(0, end).join(".");
        if (!prefix) continue;
        const detail = importMeaning(relative + prefix, file.path);
        if (detail) names.set(prefix, detail);
      }
    }
  }
}

function addLocalBindings(file, lines, names, variableNames, loopBindings, first, last) {
  const visible = lines.slice(first - 1, last).join(" ").matchAll(codeNames);
  const symbols = new Set();
  for (const [token] of visible) {
    if (!simpleName.test(token)) continue;
    symbols.add(token);
    symbols.add(token.split(".")[0]);
  }
  for (let line = first; line <= last; line++) {
    for (const [start, end] of file.interpolations?.[line] || []) {
      symbols.add(lines[line - 1].slice(start, end));
    }
  }
  for (const name of symbols) {
    if (!Object.hasOwn(file.bindings || {}, name)) continue;
    const bindings = file.bindings[name].filter(([at, from, to]) =>
      at >= first && at <= last || (!from || from <= first && first <= to) && at <= last
      || name.startsWith("self."));
    bindings.sort(([a, aFrom], [b, bFrom]) => (b <= last) - (a <= last) || bFrom - aFrom || b - a);
    if (!bindings.length) continue;
    const [at, from, , role, origin] = bindings[0];
    if (role === "assignment" || role === "attribute" || role === "unpack") variableNames.add(name);
    if (role === "module" || role === "import") {
      const detail = importMeaning(origin, file.path);
      if (detail) names.set(name, detail);
      else if (!names.has(name)) {
        const [kind, moduleName] = role === "module"
          ? ["模块", origin]
          : ["导入成员", origin.slice(0, origin.lastIndexOf("."))];
        names.set(name, {description: kind + "，来源是 " + moduleName + "。", source: file.path + " · 第 " + at + " 行"});
      }
      continue;
    }
    const contextId = nameContextIndex.files[file.path]?.[at]?.[name];
    const indexedMeaning = contextId === undefined ? "" : nameContextIndex.meanings[contextId];
    const definition = file.path + " · 第 " + at + " 行";
    if (role === "iteration" && indexedMeaning) {
      loopBindings.set(name, {description: indexedMeaning, source: definition});
      continue;
    }
    if (names.has(name) && !vagueNameMeaning(names.get(name))) continue;
    const records = expressionIndex.files[file.path] || {};
    const row = records[at];
    let description = "";
    if (variableNames.has(name)) {
      description = shortMeaning(row?.outer && row.nodes[0].result)
        || shortMeaning(projectManual[file.path]?.[at]?.result)
        || indexedMeaning;
    } else if (role === "function" || role === "class") {
      description = shortMeaning(row?.definition?.purpose);
    }
    const roles = {
      parameter: "这个函数接收的参数，由调用者传入。",
      assignment: from ? "当前函数使用的局部数据。" : "可由当前文件中的函数使用的模块级变量。",
      attribute: "随对象实例保存的数据。",
      unpack: "从一组结果中取出的独立分量。",
      iteration: "此变量的具体含义待核实，可先查看它遍历的数据。",
      exception: "保存这一分支捕获到的异常对象。",
      resource: "接收进入当前资源管理块时得到的对象。",
      function: "本文件在这里定义的函数。",
      class: "本文件在这里定义的类。",
      module: "导入的模块 " + origin + "，用来访问该模块提供的成员。",
      import: "从 " + origin + " 导入的名称，供当前文件使用。",
    };
    names.set(name, {
      description: description || roles[role],
      source: definition,
    });
  }
}

function insertTerm(parent, text, label, meaning, prose) {
  const token = add(parent, "button", text, prose ? "name-term text-term" : "name-term");
  token.type = "button";
  token.dataset.name = label;
  token.dataset.meaning = typeof meaning === "string" ? meaning : meaning.description;
  if (meaning.source) token.dataset.definition = meaning.source;
}

function sourceNameRole(token, qualified, index, count, before, rest, language) {
  const compact = value => value.replace(/\s+/g, " ").trim().slice(0, 72);
  const head = before.slice(-160);
  const tail = rest.slice(0, 160);
  const member = qualified.slice(0, -token.length).replace(/(?:\.|::|->)$/, "");
  if (index < count - 1) return "当前访问的限定名。后面的成员通过 " + qualified + " 查找。";
  if (language === "py" && /\bfrom\s+[^\s]*$/.test(head)) return "导入来源所在的模块，用来查找 import 后列出的成员。";
  const indexing = tail.match(/^\s*\[([^\]]{1,65})\]/);
  if (indexing) return "被索引的对象，用 " + compact(indexing[1]) + " 选出其中一项或一段。";
  const call = tail.match(/^\s*\(([^()]{0,70})\)/);
  if (call) return "可调用对象。这里计算 " + qualified + "(" + compact(call[1]) + ")。";
  if (/^\s*\(/.test(tail)) return "这里调用的" + (member ? "成员函数" : "函数或可调用对象") + "，接收后面括号中的输入。";
  if (/\b(?:if|while|assert)\b/.test(head)) return "这个条件中的判断值，影响接下来是否执行对应代码。";
  if (/\breturn\b/.test(head)) return "函数返回表达式中的值，供调用方使用。";
  if (/\b(?:sizeof|decltype)\s*\([^)]*$/.test(head)) return "运算的输入，用来确定对象的大小或表达式的类型。";
  const macro = head.match(/^\s*#\s*(define|ifdef|ifndef|undef)\s*$/);
  if (macro) return "预处理宏。" + ({
    define: "后续代码可以引用这里定义的值或展开规则。",
    ifdef: "已经定义时编译下面的条件分支。",
    ifndef: "尚未定义时编译下面的条件分支。",
    undef: "清除这个宏的定义，后面的代码不再展开它。",
  })[macro[1]];
  const rhs = head.match(/\b([\w.:[\]>-]+)\s*(?:[+*\/%&|^:-])?=(?!=)[^;=]*$/);
  if (rhs) return "右侧表达式中的输入，参与计算写给 " + rhs[1] + " 的值。";
  const argument = head.match(/([\w.:-]+)\s*\(([^()]*)$/);
  if (argument) return "括号内的输入，用于 " + argument[1] + " 的调用或构造。";
  if (/^\s*:\s*\S/.test(tail) && /^(?:yml|yaml|css)$/.test(language)) {
    return "这里设置的" + (language === "css" ? "样式属性" : "配置键") + "，当前取值为 " + compact(tail.trimStart().slice(1)) + "。";
  }
  return "";
}

function splitCodeTerms(node, meanings, prose, source = false, language = "", localMeaning) {
  const text = node.nodeValue;
  const parts = document.createDocumentFragment();
  const native = Boolean(source && /^(?:c|cc|cpp|cu|cuh|h|hpp|inl|js|css)$/.test(language));
  const keywords = language === "py" ? pythonKeywords : nativeKeywords;
  const formatAsCode = prose && !node.parentElement.closest("code");
  const shell = language === "sh" || language === "bash";
  if (source && shell && text.trimStart().startsWith("#")) return;
  let offset = 0;
  for (const match of text.matchAll(native ? nativeCodeNames : codeNames)) {
    const token = match[0];
    if (source && ((shell && /^[\$"]/.test(token)) || (language === "js" && token.startsWith(String.fromCharCode(96))))) {
      const fields = shell ? /(?<!\\)\$(?:\{([A-Za-z_]\w*)(?=[}:])|([A-Za-z_]\w*))/g : /(?<!\\)\$\{([^{}]+)\}/g;
      const substitutions = [...token.matchAll(fields)];
      if (substitutions.length) {
        parts.append(text.slice(offset, match.index));
        let last = 0;
        for (const field of substitutions) {
          const value = field[1] || field[2];
          const start = field.index + (field[1] ? 2 : 1);
          parts.append(token.slice(last, start));
          const interpolation = add(parts, "span", value, "interpolation-name");
          splitCodeTerms(interpolation.firstChild, meanings, prose, true, language);
          last = start + value.length;
        }
        parts.append(token.slice(last));
        offset = match.index + token.length;
        continue;
      }
    }
    if (!simpleName.test(token) || keywords.has(token)) continue;
    const keys = [...token.matchAll(/[A-Za-z_$][\w$]*/g)];
    const candidate = localMeaning?.(token, match.index) || meanings.get(token);
    const meaning = !vagueNameMeaning(candidate) && candidate;
    const rest = text.slice(match.index + token.length);
    if (!source && !keys.some(key => meanings.has(token.slice(0, key.index + key[0].length)))) continue;
    parts.append(text.slice(offset, match.index));
    const target = formatAsCode ? add(parts, "code") : parts;
    const precededByDot = source && language === "py" && text[match.index - 1] === ".";
    const chainedMethod = precededByDot && Object.hasOwn(tensorMethods, token) && /^\s*\(/.test(rest);
    if (chainedMethod) {
      insertTerm(target, token, token, tensorMethods[token], prose);
    } else if (meaning && (keys.length === 1 || prose)) {
      insertTerm(target, token, token, meaning, prose);
    } else {
      let start = 0;
      for (const [index, {[0]: key, index: column}] of keys.entries()) {
        target.append(token.slice(start, column));
        const qualified = token.slice(0, column + key.length);
        const isMethod = language === "py" && index > 0 && index === keys.length - 1 && /^\s*\(/.test(rest);
        const mapped = (isMethod && Object.hasOwn(tensorMethods, key) && tensorMethods[key]) || localMeaning?.(qualified, match.index + column) || meanings.get(qualified);
        const detail = mapped && !vagueNameMeaning(mapped) ? mapped
          : source && sourceNameRole(key, qualified, index, keys.length, text.slice(0, match.index), rest, language);
        if (detail) insertTerm(target, key, qualified, detail, prose);
        else target.append(key);
        start = column + key.length;
      }
    }
    offset = match.index + token.length;
  }
  if (offset) {
    parts.append(text.slice(offset));
    node.replaceWith(parts);
  }
}

function splitGlossaryTerms(node) {
  const text = node.nodeValue;
  const matches = [...text.matchAll(glossaryNames)];
  if (!matches.length) return [node];
  const parts = document.createDocumentFragment();
  const remaining = [];
  function appendText(value) {
    if (value) {
      const part = document.createTextNode(value);
      parts.append(part);
      remaining.push(part);
    }
  }
  let offset = 0;
  for (const match of matches) {
    const term = match[0];
    appendText(text.slice(offset, match.index));
    insertTerm(parts, term, term, glossary[term], true);
    offset = match.index + term.length;
  }
  appendText(text.slice(offset));
  node.replaceWith(parts);
  return remaining;
}

function splitMarkupTerms(node) {
  const text = node.nodeValue;
  const parts = document.createDocumentFragment();
  const tags = /<!--[\s\S]*?(?:-->|$)|<(\/?)([A-Za-z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  const attributes = /([A-Za-z_:][\w.:-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g;
  const meanings = {
    id: "这个元素在页面中的标识，可供样式、脚本或页内链接定位。",
    class: "为元素指定样式类，CSS 和 JavaScript 也可以用它找到这类元素。",
    href: "链接指向的地址。",
    src: "图像、视频或脚本等资源的来源地址。",
    alt: "描述图片内容的替代文本。",
    rel: "描述当前页面与链接资源的关系。",
    type: "说明此控件或资源的类型。",
    name: "元素的名称，用于提交表单字段或标记元数据。",
    content: "和元数据名称对应的内容。",
    charset: "浏览器解码当前文档时使用的字符编码。",
    style: "直接写在这个元素上的 CSS 样式。",
    title: "为当前元素提供的补充标题或提示。",
  };
  const elements = {
    html: "整份 HTML 文档的根元素。",
    head: "放页面标题、资源链接和其他元数据的区域。",
    body: "承载页面正文和交互控件的区域。",
    div: "通用块容器，用来组织同一区域中的内容。",
    span: "行内容器，用来标记一小段文字或内容。",
    a: "链接元素。通过 href 指向另一个页面或位置。",
    img: "图片元素。通过 src 指定图片文件。",
    script: "脚本元素，用来声明或加载页面运行的脚本。",
    link: "关联外部资源的元素，例如给页面加载样式表。",
    meta: "保存文档元数据，供浏览器读取字符编码等设置。",
    table: "把数据排列成行和列的表格。",
    tr: "表格中的一行，包含一个或多个单元格。",
    td: "表格中的数据单元格。",
    th: "表格中的标题单元格，用于说明一列或一行的含义。",
    pre: "保留空格和换行，用于显示源码或预格式化文本。",
    code: "标记一段代码或标识符。",
    p: "表示一段正文。",
    br: "在同一段内容中插入一次换行。",
    li: "列表中的一项。",
    ul: "无序列表，用来列出并列项目。",
    ol: "有序列表，用编号表示项目顺序。",
  };
  let offset = 0;
  for (const match of text.matchAll(tags)) {
    const [whole, ending, name, body] = match;
    if (!name || (body && !/^[\s/]/.test(body))) continue;
    parts.append(text.slice(offset, match.index), "<" + ending);
    const tag = name.toLowerCase();
    const purpose = Object.hasOwn(elements, tag) ? elements[tag]
      : /^h[1-6]$/.test(tag) ? "页面标题元素，用数字表示标题层级。" : "";
    if (purpose) insertTerm(parts, name, name, purpose, false);
    else parts.append(name);
    let index = 0;
    for (const attribute of body.matchAll(attributes)) {
      const key = attribute[1];
      parts.append(body.slice(index, attribute.index));
      const detail = Object.hasOwn(meanings, key) ? meanings[key]
        : key.startsWith("data-") ? "给元素保存一项数据，脚本可以通过 dataset 读取。" : "";
      if (typeof detail === "string" && detail) insertTerm(parts, key, key, detail, false);
      else parts.append(key);
      index = attribute.index + key.length;
    }
    parts.append(body.slice(index), ">");
    offset = match.index + whole.length;
  }
  if (offset) {
    parts.append(text.slice(offset));
    node.replaceWith(parts);
  }
}

function splitConfigurationTerms(node, language, path) {
  const text = node.nodeValue;
  const css = language === "css";
  const keys = css ? /(?:^|[;{])\s*((?:--)?[a-z][\w-]*)\s*:\s*([^;{}]*)/gi
    : /^(?:\s*[- ]?\s*)([A-Za-z_][\w-]*)\s*:\s*(.*)$/gm;
  const parts = document.createDocumentFragment();
  let offset = 0;
  for (const match of text.matchAll(keys)) {
    const [value, name, assigned] = match;
    const start = match.index + value.indexOf(name);
    const known = css ? stylesheetNames : path === "environment.yml" ? environmentNames : {};
    const setting = Object.hasOwn(known, name) ? known[name] : css
      ? (name.startsWith("--") ? "CSS 自定义属性，供 var() 读取。" : "这一条样式声明所设置的属性。")
      : "这个配置块中的键，用来读取冒号后设置的值。";
    parts.append(text.slice(offset, start));
    const input = assigned.trim().slice(0, 60);
    insertTerm(parts, name, name, setting + (input ? "当前值为 " + input + "。" : ""), false);
    offset = start + name.length;
  }
  if (offset) {
    parts.append(text.slice(offset));
    node.replaceWith(parts);
  }
}

function repeatedLoopBindings(file, first, last) {
  const duplicates = new Map();
  for (const [name, entries] of Object.entries(file.bindings || {})) {
    const matching = entries.filter(([at, , , role]) => role === "iteration" && first <= at && at <= last);
    if (matching.length > 1) duplicates.set(name, matching);
  }
  return duplicates;
}

function addExplanationTerms(panel, file, line) {
  const walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (/[\w\u3400-\u9fff]/.test(node.nodeValue)) nodes.push(node);
  }
  const scopeMeanings = new Map();
  const snippetBindings = new WeakMap();
  const language = file.path.split(".").at(-1).toLowerCase();
  const sourceLanguage = /^(?:py|cu|cuh|c|cc|cpp|h|hpp|inl|js|sh|bash|css|yml|yaml|cmake|in)$/.test(language)
    || /(?:^|\/)CMakeLists\.txt$/.test(file.path);
  for (const node of nodes) {
    const text = node.parentElement;
    if (!text || text.closest("button, a, input, select, svg, .kw, .comment, .line-note-header, .file-flow-caption")) continue;
    const locator = text.closest("[data-source-first], .expression-node[data-line]");
    const snippet = text.closest(".line-excerpt");
    const code = text.closest("code");
    const paragraph = text.closest(".line-note p, .line-note dd, .definition-return-meaning");
    if (snippet && /^html?$/.test(language)) {
      splitMarkupTerms(node);
      continue;
    }
    if (snippet && /^(?:css|yml|yaml)$/.test(language)) {
      splitConfigurationTerms(node, language, file.path);
      continue;
    }
    if (snippet || code || paragraph) {
      const first = Number(locator?.dataset.sourceFirst || locator?.dataset.line || line);
      const last = Number(locator?.dataset.sourceLast || first);
      const key = first + ":" + last;
      if (!scopeMeanings.has(key)) scopeMeanings.set(key, collectNameMeanings(file, first, last));
      const meanings = scopeMeanings.get(key);
      if (text.closest(".lit")) {
        const literal = node.nodeValue.match(/^["']([A-Za-z_]\w*)["']$/);
        if (literal && meanings.has(literal[1])) {
          const parts = document.createDocumentFragment();
          parts.append(node.nodeValue.at(0));
          insertTerm(parts, literal[1], literal[1], meanings.get(literal[1]), !snippet);
          parts.append(node.nodeValue.at(-1));
          node.replaceWith(parts);
        }
      } else {
        const source = Boolean(sourceLanguage && (snippet || code?.closest(".block-outline, .definition-return-code")));
        const fragments = paragraph && !code ? splitGlossaryTerms(node) : [node];
        const offsets = snippet && excerptLineOffsets.get(snippet);
        let localMeaning;
        if (offsets) {
          if (!snippetBindings.has(snippet)) snippetBindings.set(snippet, repeatedLoopBindings(file, first, last));
          const repeated = snippetBindings.get(snippet);
          if (repeated.size) {
            const range = document.createRange();
            range.selectNodeContents(snippet);
            range.setEndBefore(node);
            const start = range.toString().length;
            localMeaning = (name, offset) => {
              const at = first + offsets.findLastIndex(value => value <= start + offset);
              const binding = repeated.get(name)?.findLast(([definition, from, to]) =>
                definition === at || from <= at && at <= to && definition <= at);
              const id = binding && nameContextIndex.files[file.path]?.[binding[0]]?.[name];
              if (id !== undefined) {
                return {description: nameContextIndex.meanings[id], source: file.path + " · 第 " + binding[0] + " 行"};
              }
            };
          }
        }
        for (const fragment of fragments) splitCodeTerms(fragment, meanings, !snippet, source, language, localMeaning);
      }
    }
  }
}

let nameTip;
let activeNameTerm;

function hideNameTip() {
  activeNameTerm?.removeAttribute("aria-describedby");
  activeNameTerm = null;
  if (nameTip) nameTip.hidden = true;
}

function showNameTip(term) {
  if (activeNameTerm === term) return;
  hideNameTip();
  if (!nameTip) {
    nameTip = add(document.body, "div", null, "name-tip");
    nameTip.id = "name-tip";
    nameTip.setAttribute("role", "tooltip");
    add(nameTip, "code");
    add(nameTip, "p");
    const origin = add(nameTip, "div", null, "name-tip-definition");
    add(origin, "span", "定义于");
    add(origin, "code");
  }
  activeNameTerm = term;
  nameTip.querySelector("code").textContent = term.dataset.name;
  nameTip.querySelector("p").textContent = term.dataset.meaning;
  const origin = nameTip.querySelector(".name-tip-definition");
  origin.hidden = !term.dataset.definition;
  origin.querySelector("code").textContent = term.dataset.definition || "";
  term.setAttribute("aria-describedby", nameTip.id);
  nameTip.hidden = false;
  const anchor = term.getBoundingClientRect();
  const excerpt = term.closest(".line-excerpt")?.getBoundingClientRect();
  const room = document.documentElement.clientWidth - nameTip.offsetWidth - 12;
  const x = Math.max(12, Math.min(room, anchor.left + (anchor.width - nameTip.offsetWidth) / 2));
  const below = (excerpt?.bottom ?? anchor.bottom) + 8;
  const above = (excerpt?.top ?? anchor.top) - nameTip.offsetHeight - 8;
  const y = below + nameTip.offsetHeight < innerHeight ? below : Math.max(8, above);
  nameTip.style.left = x + "px";
  nameTip.style.top = y + "px";
}

for (const event of ["pointerover", "focusin", "click"]) {
  document.addEventListener(event, action => {
    const term = action.target.closest?.(".name-term");
    if (term) showNameTip(term);
    else if (event === "click") hideNameTip();
  });
}
document.addEventListener("pointerout", event => {
  if (event.target === activeNameTerm && !activeNameTerm.matches(":focus-visible")) hideNameTip();
});
document.addEventListener("focusout", event => {
  if (event.target === activeNameTerm) hideNameTip();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideNameTip();
});
window.addEventListener("scroll", hideNameTip, {capture: true, passive: true});
window.addEventListener("resize", hideNameTip);
